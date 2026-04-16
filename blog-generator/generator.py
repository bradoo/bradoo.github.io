#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
静态博客生成器
作者: 吴勇
功能: 将 Markdown 文章转换为 HTML 页面
"""

import os
import json
import re
from datetime import datetime
from pathlib import Path
import markdown
from jinja2 import Template
import shutil

class BlogGenerator:
    def __init__(self, config_path='blog-generator/config.json'):
        """初始化生成器"""
        with open(config_path, 'r', encoding='utf-8') as f:
            self.config = json.load(f)
        
        self.content_dir = Path(self.config['paths']['content'])
        self.template_dir = Path(self.config['paths']['templates'])
        self.output_dir = Path(self.config['paths']['output'])
        
        # 确保目录存在
        self.content_dir.mkdir(parents=True, exist_ok=True)
        self.template_dir.mkdir(parents=True, exist_ok=True)
        
        # Markdown 扩展
        self.md = markdown.Markdown(extensions=[
            'extra',
            'codehilite',
            'toc',
            'meta',
            'tables',
            'fenced_code'
        ])
        
        self.articles = []
    
    def parse_frontmatter(self, content):
        """解析文章头部信息"""
        frontmatter = {}
        lines = content.split('\n')
        
        if lines[0].strip() == '---':
            end_index = -1
            for i, line in enumerate(lines[1:], 1):
                if line.strip() == '---':
                    end_index = i
                    break
            
            if end_index > 0:
                for line in lines[1:end_index]:
                    if ':' in line:
                        key, value = line.split(':', 1)
                        frontmatter[key.strip()] = value.strip().strip('"\'')
                
                content = '\n'.join(lines[end_index + 1:])
        
        return frontmatter, content
    
    def calculate_read_time(self, content):
        """计算阅读时间（中文按字数，英文按单词数）"""
        # 移除 HTML 标签
        text = re.sub(r'<[^>]+>', '', content)
        # 中文字符数
        chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text))
        # 英文单词数
        english_words = len(re.findall(r'\b[a-zA-Z]+\b', text))
        
        # 中文 300字/分钟，英文 200词/分钟
        read_time = (chinese_chars / 300) + (english_words / 200)
        return max(1, int(read_time))
    
    def process_article(self, file_path):
        """处理单篇文章"""
        print(f"处理文章: {file_path}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 解析 frontmatter
        frontmatter, markdown_content = self.parse_frontmatter(content)
        
        # 转换 Markdown 为 HTML
        html_content = self.md.convert(markdown_content)
        
        # 提取文章信息
        article = {
            'title': frontmatter.get('title', '无标题'),
            'date': frontmatter.get('date', datetime.now().strftime('%Y-%m-%d')),
            'category': frontmatter.get('category', 'tech'),
            'tags': frontmatter.get('tags', '').split(',') if frontmatter.get('tags') else [],
            'description': frontmatter.get('description', ''),
            'coverImage': frontmatter.get('cover', ''),
            'views': int(frontmatter.get('views', 0)),
            'content': html_content,
            'readTime': self.calculate_read_time(html_content),
            'filename': file_path.stem,
            'source_file': str(file_path)
        }
        
        # 添加分类信息
        category_info = self.config['categories'].get(article['category'], {})
        article['categoryName'] = category_info.get('name', '未分类')
        article['categoryIcon'] = category_info.get('icon', '📝')
        
        # 生成 URL
        article['url'] = f"{self.config['site']['url']}/{article['category']}/{article['filename']}.html"
        
        # 如果没有封面图，使用默认图
        if not article['coverImage']:
            article['coverImage'] = f"/images/{article['category']}.jpg"
        
        # 如果没有描述，从内容中提取
        if not article['description']:
            text = re.sub(r'<[^>]+>', '', html_content)
            article['description'] = text[:150] + '...' if len(text) > 150 else text
        
        return article
    
    def load_articles(self):
        """加载所有文章"""
        print("加载文章...")
        self.articles = []
        
        # 遍历所有 Markdown 文件
        for md_file in self.content_dir.rglob('*.md'):
            try:
                article = self.process_article(md_file)
                self.articles.append(article)
            except Exception as e:
                print(f"处理文章失败 {md_file}: {e}")
        
        # 按日期排序
        self.articles.sort(key=lambda x: x['date'], reverse=True)
        print(f"共加载 {len(self.articles)} 篇文章")
    
    def generate_article_page(self, article, index):
        """生成单篇文章页面"""
        # 加载模板
        template_path = self.template_dir / 'article.html'
        with open(template_path, 'r', encoding='utf-8') as f:
            template_content = f.read()
        
        # 简单的模板替换（不使用 Jinja2 的复杂语法）
        html = template_content
        
        # 替换基本变量
        replacements = {
            '{{title}}': article['title'],
            '{{description}}': article['description'],
            '{{keywords}}': ', '.join(article['tags']) if article['tags'] else article['categoryName'],
            '{{url}}': article['url'],
            '{{image}}': article['coverImage'],
            '{{date}}': article['date'],
            '{{category}}': article['categoryName'],
            '{{categoryIcon}}': article['categoryIcon'],
            '{{categoryName}}': article['categoryName'],
            '{{views}}': str(article['views']),
            '{{readTime}}': str(article['readTime']),
            '{{content}}': article['content']
        }
        
        for key, value in replacements.items():
            html = html.replace(key, value)
        
        # 处理封面图
        if article['coverImage']:
            html = html.replace('{{#if coverImage}}', '')
            html = html.replace('{{/if}}', '')
            html = html.replace('{{coverImage}}', article['coverImage'])
        else:
            # 移除封面图部分
            html = re.sub(r'{{#if coverImage}}.*?{{/if}}', '', html, flags=re.DOTALL)
        
        # 处理标签
        if article['tags']:
            tags_html = ''
            for tag in article['tags']:
                tags_html += f'<a href="/tags.html#{tag}" class="tag">#{tag}</a>\n'
            html = html.replace('{{#if tags}}', '')
            html = html.replace('{{/if}}', '')
            html = html.replace('{{#each tags}}', '')
            html = html.replace('{{/each}}', '')
            html = html.replace('<a href="/tags.html#{{this}}" class="tag">#{{this}}</a>', tags_html)
        else:
            html = re.sub(r'{{#if tags}}.*?{{/if}}', '', html, flags=re.DOTALL)
        
        # 处理导航（上一篇/下一篇）
        nav_html = ''
        if index > 0:
            prev = self.articles[index - 1]
            nav_html += f'''
            <a href="/{prev['category']}/{prev['filename']}.html" class="nav-link">
                <div>← 上一篇</div>
                <div class="nav-link-title">{prev['title']}</div>
            </a>
            '''
        
        if index < len(self.articles) - 1:
            next_article = self.articles[index + 1]
            nav_html += f'''
            <a href="/{next_article['category']}/{next_article['filename']}.html" class="nav-link">
                <div>下一篇 →</div>
                <div class="nav-link-title">{next_article['title']}</div>
            </a>
            '''
        
        if nav_html:
            html = html.replace('{{#if navigation}}', '')
            html = html.replace('{{/if}}', '')
            html = re.sub(r'{{#if navigation\.prev}}.*?{{/if}}', '', html, flags=re.DOTALL)
            html = re.sub(r'{{#if navigation\.next}}.*?{{/if}}', '', html, flags=re.DOTALL)
            html = html.replace('<div class="article-nav">', f'<div class="article-nav">{nav_html}')
        else:
            html = re.sub(r'{{#if navigation}}.*?{{/if}}', '', html, flags=re.DOTALL)
        
        # 清理剩余的模板标记
        html = re.sub(r'{{[^}]+}}', '', html)
        
        # 保存文件
        output_path = self.output_dir / article['category'] / f"{article['filename']}.html"
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)
        
        print(f"生成: {output_path}")
    
    def generate_blog_list(self):
        """生成博客列表页面"""
        print("生成博客列表页面...")
        # TODO: 实现博客列表页面生成
        pass
    
    def generate_sitemap(self):
        """生成 sitemap.xml"""
        print("生成 sitemap.xml...")
        
        sitemap = ['<?xml version="1.0" encoding="UTF-8"?>']
        sitemap.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
        
        # 添加主页
        sitemap.append('  <url>')
        sitemap.append(f'    <loc>{self.config["site"]["url"]}/</loc>')
        sitemap.append(f'    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>')
        sitemap.append('    <changefreq>weekly</changefreq>')
        sitemap.append('    <priority>1.0</priority>')
        sitemap.append('  </url>')
        
        # 添加所有文章
        for article in self.articles:
            sitemap.append('  <url>')
            sitemap.append(f'    <loc>{article["url"]}</loc>')
            sitemap.append(f'    <lastmod>{article["date"]}</lastmod>')
            sitemap.append('    <changefreq>monthly</changefreq>')
            sitemap.append('    <priority>0.8</priority>')
            sitemap.append('  </url>')
        
        sitemap.append('</urlset>')
        
        output_path = self.output_dir / 'sitemap.xml'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(sitemap))
        
        print(f"生成: {output_path}")
    
    def generate_rss(self):
        """生成 RSS feed"""
        print("生成 RSS feed...")
        
        rss = ['<?xml version="1.0" encoding="UTF-8"?>']
        rss.append('<rss version="2.0">')
        rss.append('  <channel>')
        rss.append(f'    <title>{self.config["site"]["title"]}</title>')
        rss.append(f'    <link>{self.config["site"]["url"]}</link>')
        rss.append(f'    <description>{self.config["site"]["description"]}</description>')
        rss.append(f'    <language>{self.config["site"]["language"]}</language>')
        
        # 添加最新的 10 篇文章
        for article in self.articles[:10]:
            rss.append('    <item>')
            rss.append(f'      <title>{article["title"]}</title>')
            rss.append(f'      <link>{article["url"]}</link>')
            rss.append(f'      <description>{article["description"]}</description>')
            rss.append(f'      <pubDate>{article["date"]}</pubDate>')
            rss.append(f'      <category>{article["categoryName"]}</category>')
            rss.append('    </item>')
        
        rss.append('  </channel>')
        rss.append('</rss>')
        
        output_path = self.output_dir / 'feed.xml'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(rss))
        
        print(f"生成: {output_path}")
    
    def build(self):
        """构建整个网站"""
        print("=" * 50)
        print("开始构建静态网站...")
        print("=" * 50)
        
        # 加载所有文章
        self.load_articles()
        
        # 生成每篇文章的页面
        for index, article in enumerate(self.articles):
            self.generate_article_page(article, index)
        
        # 生成其他页面
        if self.config['build']['generateSitemap']:
            self.generate_sitemap()
        
        if self.config['build']['generateRSS']:
            self.generate_rss()
        
        if self.config['build']['generateBlogList']:
            self.generate_blog_list()
        
        print("=" * 50)
        print(f"构建完成！共生成 {len(self.articles)} 篇文章")
        print("=" * 50)

def main():
    """主函数"""
    generator = BlogGenerator()
    generator.build()

if __name__ == '__main__':
    main()

# Made with Bob
