# 🚀 快速开始指南

## 5分钟上手博客生成器

### 第一步：安装依赖

```bash
# 安装 Python 依赖包
pip3 install markdown jinja2 pyyaml python-frontmatter

# 给构建脚本添加执行权限
chmod +x blog-generator/build.sh
```

### 第二步：创建文章

在 `blog-generator/content/` 目录创建新文件 `my-article.md`：

```markdown
---
title: 我的第一篇文章
date: 2026-04-16
category: tech
tags: 博客,教程
description: 这是我的第一篇文章
---

## 标题

这是文章内容...
```

### 第三步：生成和部署

```bash
# 运行自动化脚本
./blog-generator/build.sh
```

就这么简单！✨

---

## 📝 文章模板

复制以下模板开始写作：

```markdown
---
title: 文章标题
date: 2026-04-16
category: tech
tags: 标签1,标签2
description: 文章简介
cover: /images/cover.jpg
views: 0
---

## 第一部分

内容...

## 第二部分

内容...

## 总结

总结内容...
```

---

## 🎯 分类选择

| 分类 | 用途 |
|------|------|
| `running` | 跑步、马拉松相关 |
| `speech` | 演讲、分享相关 |
| `reading` | 读书笔记 |
| `tech` | 技术文章 |

---

## 🔧 常用命令

```bash
# 仅生成 HTML（不部署）
python3 blog-generator/generator.py

# 本地预览
python3 -m http.server 8000
# 访问 http://localhost:8000

# 完整构建和部署
./blog-generator/build.sh
```

---

## 💡 提示

1. **文件名**: 使用英文和连字符，如 `my-first-post.md`
2. **图片**: 放在 `/images/` 目录
3. **预览**: 先本地预览，确认无误后再部署
4. **备份**: 定期备份 `content` 目录

---

## ❓ 遇到问题？

查看完整文档：[README.md](README.md)

或联系：
- 邮箱: 46326357@qq.com
- 微信: runnerbrad

---

**祝您写作愉快！** ✍️