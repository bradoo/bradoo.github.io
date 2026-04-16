# IT English Coach 🚀

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/yourusername/it-english-coach)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

面向 IT 外企员工的工作英语提升平台 - 专注真实工作场景，系统提升职场英语能力。

[English](#english-version) | [中文](#中文版本)

---

## 中文版本

## 产品定位

`IT English Coach` 是一个轻量级、可直接在浏览器打开的单页应用，帮助 IT 外企员工提升以下高频工作英语能力：

- 日常站会表达
- 邮件与即时消息写作
- 技术问题沟通
- 跨团队协作表达
- 英文会议发言与跟进
- 常见 IT 场景词汇积累

## ✨ 核心特性

### 🎯 真实场景驱动
- **5 大高频工作场景**：Daily Standup、Bug Reporting、Code Review、Client Communication、Incident Response
- **场景化学习**：每个场景包含目标、句型、替换表达和使用建议
- **实战导向**：直接应用于日常工作沟通

### 💡 智能改写助手
- **中英文输入**：支持中文或基础英文输入
- **职业化输出**：生成更自然、更专业的工作英语表达
- **详细说明**：每个改写都附带表达技巧说明

### 🗣️ 多维度训练
- **会议表达库**：6 大类常用会议表达（Opening、Clarifying、Suggesting 等）
- **口语练习卡**：带发音提示和使用场景的跟读练习
- **快速测验**：检验学习效果的场景化选择题

### 📊 学习追踪
- **进度记录**：自动保存学习进度和连续天数
- **目标管理**：每日学习目标和完成度追踪
- **7 天计划**：结构化的学习路径建议

### 🎨 现代化体验
- **深浅主题**：支持深色/浅色主题切换
- **响应式设计**：完美适配桌面和移动设备
- **PWA 支持**：可安装为独立应用，支持离线使用
- **无障碍访问**：完整的键盘导航和屏幕阅读器支持

## 核心价值

- **聚焦真实工作场景**：不是泛英语学习，而是直接面向 IT 外企办公环境
- **零门槛使用**：纯前端静态页面，打开即可使用，无需安装
- **输入 + 模仿 + 输出结合**：既看表达，也练改写和口语
- **渐进式增强**：从基础 MVP 到完整产品的清晰演进路径

## 首版功能范围

### 1. 今日学习面板
展示学习连续天数、今日目标、已完成模块与鼓励文案。

### 2. 场景化学习
预置多个 IT 外企常见沟通场景，例如：

- Daily Standup
- Bug Reporting
- Code Review
- Client Communication
- Incident Response

每个场景包含：

- 场景目标
- 高频句型
- 可替换表达
- 中文提示
- 使用建议

### 3. 邮件/消息改写助手
用户输入中文或普通英文句子后，软件给出更职业、更自然的英文表达模板，帮助用户学习：

- 更礼貌的表达
- 更清晰的请求方式
- 更适合外企语境的写法

### 4. 会议表达训练
提供会议中常见表达分类：

- Opening
- Clarifying
- Suggesting
- Disagreeing politely
- Summarizing
- Following up

### 5. 口语跟读卡片
展示英文句子、中文释义、发音提示和适用场景，支持用户逐条练习。

### 6. 快速测验
提供单题选择练习，帮助用户判断更自然的工作表达方式。

### 7. 学习计划
根据工作英语提升目标提供 7 天练习建议。

## 页面结构

- 顶部 Hero 区：产品标题、定位说明、行动按钮
- 学习概览区：学习进度卡片
- 场景学习区：可切换的场景卡片
- 改写助手区：输入文本并查看优化结果
- 会议表达区：常用表达列表
- 口语练习区：跟读卡片
- 自测区：选择题
- 学习计划区：7 天建议安排

## 项目文件结构

```text
it-english-coach/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 技术方案

首版采用纯前端静态实现：

- [`index.html`](it-english-coach/index.html)：页面结构
- [`style.css`](it-english-coach/style.css)：视觉样式与响应式布局
- [`script.js`](it-english-coach/script.js)：交互逻辑、数据渲染、练习与改写规则

## 已实现能力

- 场景切换与内容动态渲染
- 今日重点展示
- 工作英语改写助手
- 会议表达分类卡片
- 口语练习卡片切换
- 单题快速测验
- 7 天学习计划展示
- 深浅主题切换与本地记忆
- 页面内平滑跳转

## 🚀 快速开始

### 方式一：直接打开（推荐）
1. 下载或克隆项目
2. 双击 `index.html` 文件
3. 在浏览器中开始使用

### 方式二：本地服务器
```bash
# 使用 Python
python3 -m http.server 8000

# 使用 Node.js
npx serve

# 使用 PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

### 方式三：在线部署
可以部署到以下平台：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## 📱 安装为 PWA

在支持 PWA 的浏览器中：
1. 访问应用网址
2. 点击地址栏的"安装"图标
3. 确认安装
4. 从桌面或应用列表启动

## 📂 项目结构

```
it-english-coach/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 核心逻辑
├── manifest.json       # PWA 配置
├── sw.js              # Service Worker
├── README.md          # 项目文档
├── CHANGELOG.md       # 更新日志
├── CONTRIBUTING.md    # 贡献指南
└── .gitignore         # Git 忽略文件
```

## 适合的目标用户

- 在外企工作的前端、后端、测试、DevOps 工程师
- 技术项目经理、Scrum Master、产品经理
- 需要参加英文会议、写英文邮件、做英文协作沟通的 IT 从业者
- 希望从“看得懂”提升到“说得出、写得专业”的职场人

## 首版实现原则

- 零依赖
- 可直接双击打开
- 中文界面 + 英文内容结合
- 视觉专业，适合白领办公场景
- 保留未来接入 AI API 的扩展空间

## 后续扩展方向

### 1. AI 能力增强
- 接入大模型进行实时英文润色
- 支持根据岗位输出不同表达建议
- 支持对用户输入进行语气优化与语法反馈

### 2. 语音能力
- 增加语音识别
- 增加发音评分
- 增加会议口语模拟练习

### 3. 学习系统
- 登录与学习进度同步
- 错题本与高频表达收藏
- 成长数据看板
- 个性化训练推荐

### 4. 企业培训版本
- 管理员配置部门学习内容
- 不同岗位词库与课程包
- 团队学习排行与培训报表

## 🛣️ 产品路线图

### v1.1.0 ✅ (当前版本)
- [x] PWA 支持和离线功能
- [x] 无障碍访问优化
- [x] 进度追踪和自动保存
- [x] 扩展内容库

### v1.2.0 (计划中)
- [ ] AI 驱动的改写引擎
- [ ] 语音识别和发音评分
- [ ] 更多工作场景（Performance Review、Technical Presentation 等）
- [ ] 个性化学习推荐

### v2.0.0 (未来)
- [ ] 用户账号系统
- [ ] 云端进度同步
- [ ] 社区学习功能
- [ ] 企业版定制

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。

### 贡献者
感谢所有为这个项目做出贡献的人！

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 感谢所有在外企工作的 IT 从业者提供的真实场景反馈
- 感谢开源社区的支持和贡献

## 📞 联系方式

- 问题反馈：[GitHub Issues](https://github.com/yourusername/it-english-coach/issues)
- 功能建议：[GitHub Discussions](https://github.com/yourusername/it-english-coach/discussions)

---

## English Version

### About

IT English Coach is a progressive web application designed to help IT professionals working in international companies improve their workplace English communication skills.

### Key Features

- **5 Real-world Scenarios**: Daily standups, bug reporting, code reviews, client communication, and incident response
- **Smart Rewrite Assistant**: Transform casual expressions into professional workplace English
- **Meeting Expressions**: Categorized phrases for effective meeting participation
- **Speaking Practice**: Pronunciation guides and usage scenarios
- **Progress Tracking**: Automatic save and learning streak tracking
- **PWA Support**: Install as a standalone app with offline capability
- **Accessibility**: Full keyboard navigation and screen reader support

### Quick Start

1. Clone or download the repository
2. Open `index.html` in your browser
3. Start learning!

### Tech Stack

- Pure HTML5, CSS3, and JavaScript
- No dependencies or build process required
- Progressive Web App (PWA) enabled
- Service Worker for offline support

### Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for IT professionals worldwide**