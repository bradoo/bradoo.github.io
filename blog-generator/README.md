# 📝 静态博客生成器使用指南

## 🎯 项目简介

这是一个专为 GitHub Pages 设计的静态博客生成器，让您可以在本地使用 Markdown 编写文章，然后自动生成 HTML 页面并部署到 GitHub。

### 特点

- ✅ **所见即所得编辑器**: 可视化编辑，实时预览
- ✅ **简单易用**: Markdown 格式编写，自动转换为 HTML
- ✅ **完全静态**: 无需服务器端语言，完美适配 GitHub Pages
- ✅ **SEO 优化**: 自动生成 sitemap 和 RSS feed
- ✅ **响应式设计**: 自动适配各种设备
- ✅ **一键部署**: 自动化构建和部署流程

## 📂 项目结构

```
blog-generator/
├── config.json           # 配置文件
├── generator.py          # 核心生成器
├── build.sh             # 自动化构建脚本
├── requirements.txt     # Python 依赖
├── content/             # 文章目录（Markdown 文件）
│   └── example-article.md
└── templates/           # HTML 模板
    └── article.html
```

## 🚀 快速开始

### 方式一：使用可视化编辑器（推荐）

1. **打开编辑器**
```bash
# 在浏览器中打开编辑器
open blog-generator/editor.html
# 或直接双击 editor.html 文件
```

2. **编写文章**
- 填写标题、日期、分类等信息
- 在编辑器中使用 Markdown 编写内容
- 右侧实时预览效果

3. **保存文章**
- 点击"保存为 Markdown"按钮
- 将下载的 .md 文件放到 `blog-generator/content/` 目录

4. **生成和部署**
```bash
./blog-generator/build.sh
```

### 方式二：手动编写 Markdown

### 1. 环境准备

确保您的系统已安装：
- Python 3.7 或更高版本
- Git

### 2. 安装依赖

```bash
# 进入项目目录
cd bradoo.github.io

# 给构建脚本添加执行权限
chmod +x blog-generator/build.sh

# 安装 Python 依赖
pip3 install markdown jinja2 pyyaml python-frontmatter
```

### 3. 创建第一篇文章

在 `blog-generator/content/` 目录下创建一个新的 Markdown 文件，例如 `my-first-post.md`：

```markdown
---
title: 我的第一篇博客
date: 2026-04-16
category: tech
tags: 博客,教程
description: 这是我的第一篇博客文章
cover: /images/tech.jpg
views: 0
---

## 欢迎

这是我的第一篇博客文章！

### 内容

在这里写您的文章内容...
```

### 4. 构建和部署

#### 方式一：使用自动化脚本（推荐）

```bash
# 运行构建脚本
./blog-generator/build.sh
```

脚本会自动：
1. 检查环境和依赖
2. 生成静态 HTML 页面
3. 询问是否部署到 GitHub
4. 自动提交和推送代码

#### 方式二：手动构建

```bash
# 1. 生成静态页面
python3 blog-generator/generator.py

# 2. 提交到 Git
git add .
git commit -m "添加新文章"
git push origin main
```

## 📝 文章格式说明

### Front Matter（文章头部信息）

每篇文章开头必须包含 YAML 格式的元数据：

```yaml
---
title: 文章标题（必填）
date: 2026-04-16（必填，格式：YYYY-MM-DD）
category: tech（必填，可选值：running, speech, reading, tech）
tags: 标签1,标签2,标签3（可选，用逗号分隔）
description: 文章简介（可选，用于 SEO 和摘要）
cover: /images/cover.jpg（可选，封面图片路径）
views: 0（可选，阅读量）
---
```

### 分类说明

| 分类 | 说明 | 图标 |
|------|------|------|
| `running` | 奔跑日记 | 🏃 |
| `speech` | 演讲文稿 | 🎤 |
| `reading` | 读书笔记 | 📚 |
| `tech` | 技术分享 | 💻 |

### Markdown 语法

支持标准 Markdown 语法和扩展功能：

#### 基础语法
- 标题：`# H1`, `## H2`, `### H3`
- 粗体：`**文字**`
- 斜体：`*文字*`
- 链接：`[文字](URL)`
- 图片：`![描述](图片路径)`
- 列表：`-` 或 `1.`
- 引用：`> 引用文字`

#### 扩展功能
- 代码块：使用三个反引号包裹
- 表格：使用 `|` 分隔
- 任务列表：`- [ ]` 或 `- [x]`
- 脚注：`[^1]`

## ⚙️ 配置说明

编辑 [`config.json`](config.json:1) 文件来自定义您的博客：

```json
{
  "site": {
    "title": "您的网站标题",
    "author": "您的名字",
    "email": "your@email.com",
    "url": "https://yourusername.github.io"
  },
  "categories": {
    "tech": {
      "name": "技术分享",
      "icon": "💻",
      "description": "分享技术经验",
      "color": "#9b59b6"
    }
  }
}
```

## 🎨 自定义模板

### 修改文章模板

编辑 [`templates/article.html`](templates/article.html:1) 来自定义文章页面的样式和布局。

### 可用变量

模板中可以使用以下变量：

- `{{title}}` - 文章标题
- `{{date}}` - 发布日期
- `{{category}}` - 分类
- `{{categoryName}}` - 分类名称
- `{{categoryIcon}}` - 分类图标
- `{{content}}` - 文章内容（HTML）
- `{{description}}` - 文章描述
- `{{tags}}` - 标签列表
- `{{coverImage}}` - 封面图片
- `{{views}}` - 阅读量
- `{{readTime}}` - 预计阅读时间

## 📊 生成的文件

运行生成器后，会在对应的分类目录下生成 HTML 文件：

```
/
├── tech/
│   └── my-first-post.html
├── running/
│   └── marathon-2024.html
├── sitemap.xml
└── feed.xml
```

## 🔧 常见问题

### Q: 如何添加图片？

A: 将图片放在 `/images/` 目录下，然后在 Markdown 中使用相对路径引用：

```markdown
![图片描述](/images/my-image.jpg)
```

### Q: 如何修改文章？

A: 直接编辑 `blog-generator/content/` 目录下的 Markdown 文件，然后重新运行构建脚本。

### Q: 如何删除文章？

A: 删除对应的 Markdown 文件和生成的 HTML 文件，然后重新构建。

### Q: 生成器报错怎么办？

A: 检查以下几点：
1. Python 版本是否 >= 3.7
2. 依赖包是否已安装
3. Markdown 文件的 Front Matter 格式是否正确
4. 文件编码是否为 UTF-8

### Q: 如何本地预览？

A: 使用 Python 的 HTTP 服务器：

```bash
# 在项目根目录运行
python3 -m http.server 8000

# 访问 http://localhost:8000
```

## 📚 工作流程

### 日常写作流程

1. **创建文章**
   ```bash
   # 在 content 目录创建新文件
   touch blog-generator/content/new-article.md
   ```

2. **编写内容**
   - 使用您喜欢的编辑器（VS Code、Typora 等）
   - 按照 Markdown 格式编写
   - 添加必要的 Front Matter

3. **本地预览**
   ```bash
   # 生成 HTML
   python3 blog-generator/generator.py
   
   # 启动本地服务器
   python3 -m http.server 8000
   ```

4. **部署上线**
   ```bash
   # 使用自动化脚本
   ./blog-generator/build.sh
   ```

## 🎯 最佳实践

### 文章命名

- 使用有意义的文件名：`marathon-training-2024.md`
- 使用小写字母和连字符
- 避免使用中文和特殊字符

### 图片优化

- 压缩图片以提高加载速度
- 使用 WebP 格式（可选）
- 图片宽度建议不超过 1200px

### SEO 优化

- 填写完整的 Front Matter
- 使用描述性的标题
- 添加相关标签
- 编写有价值的描述

### 内容组织

- 使用清晰的标题层级
- 适当使用列表和表格
- 添加代码示例
- 包含相关图片

## 🔄 更新日志

### v1.0.0 (2026-04-16)
- ✨ 初始版本发布
- ✅ 支持 Markdown 转 HTML
- ✅ 自动生成 sitemap 和 RSS
- ✅ 一键构建和部署
- ✅ 响应式文章模板

## 📞 技术支持

如有问题或建议，请联系：

- **邮箱**: 46326357@qq.com
- **微信**: runnerbrad
- **GitHub**: [@bradoo](https://github.com/bradoo)

## 📄 许可证

MIT License

---

**Made with ❤️ by 吴勇**