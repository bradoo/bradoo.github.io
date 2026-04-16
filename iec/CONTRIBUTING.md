# 贡献指南 Contributing Guide

感谢你对 IT English Coach 项目的关注！我们欢迎各种形式的贡献。

## 如何贡献

### 报告问题 (Bug Reports)
如果你发现了 bug，请创建一个 issue 并包含：
- 问题的详细描述
- 复现步骤
- 预期行为 vs 实际行为
- 浏览器和操作系统信息
- 截图（如果适用）

### 功能建议 (Feature Requests)
如果你有新功能的想法：
- 描述功能的用途和价值
- 说明目标用户群体
- 提供使用场景示例
- 如果可能，提供设计草图

### 提交代码 (Pull Requests)

1. **Fork 项目**
   ```bash
   git clone https://github.com/yourusername/it-english-coach.git
   cd it-english-coach
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **进行修改**
   - 保持代码风格一致
   - 添加必要的注释
   - 确保响应式设计正常工作
   - 测试深色和浅色主题

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **推送到 GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request**
   - 清晰描述你的更改
   - 关联相关的 issue
   - 添加截图展示 UI 变化

## 代码规范

### JavaScript
- 使用 ES6+ 语法
- 使用有意义的变量名
- 函数应该单一职责
- 添加必要的注释

### CSS
- 使用 CSS 变量进行主题管理
- 保持选择器简洁
- 使用 BEM 命名规范（如适用）
- 确保响应式设计

### HTML
- 使用语义化标签
- 添加适当的 ARIA 标签
- 保持结构清晰

## 内容贡献

### 添加新场景
在 `script.js` 的 `scenarios` 数组中添加：
```javascript
{
    id: 'your-scenario',
    title: 'Scenario Title',
    level: 'Difficulty Level',
    goal: '学习目标',
    focusTitle: 'Focus Title',
    focusDescription: '重点描述',
    phrases: ['phrase 1', 'phrase 2'],
    alternatives: ['alternative 1', 'alternative 2'],
    tip: '中文提示',
    advice: '使用建议'
}
```

### 添加改写规则
在 `rewriteRules` 数组中添加：
```javascript
{
    match: /关键词|keyword/i,
    result: 'Professional English version',
    tips: ['提示1', '提示2', '提示3']
}
```

## 测试清单

提交前请确保：
- [ ] 在 Chrome、Firefox、Safari 中测试
- [ ] 测试移动端响应式布局
- [ ] 测试深色和浅色主题
- [ ] 测试键盘导航
- [ ] 检查控制台无错误
- [ ] 验证所有链接和按钮功能正常

## 行为准则

- 尊重所有贡献者
- 提供建设性的反馈
- 专注于项目目标
- 保持友好和专业

## 问题？

如有任何问题，欢迎：
- 创建 issue 讨论
- 发送邮件联系维护者
- 在 PR 中提问

感谢你的贡献！🎉