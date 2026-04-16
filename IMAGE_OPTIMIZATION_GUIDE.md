# 📸 图片优化指南

## 当前图片分析

### 图片使用情况
您的网站使用了大量图片资源，主要分布在：
- `/images/` - 主要图片资源
- 个人照片、博客配图、图标等

### 优化建议

## 1. 图片格式优化

### 推荐格式
- **WebP**: 现代浏览器首选，体积小30-50%
- **AVIF**: 最新格式，体积更小，但兼容性较差
- **JPEG**: 照片类图片的后备格式
- **PNG**: 需要透明背景的图片
- **SVG**: 图标和简单图形

### 实施方案
```html
<!-- 使用 picture 标签提供多种格式 -->
<picture>
    <source srcset="images/brad.webp" type="image/webp">
    <source srcset="images/brad.jpg" type="image/jpeg">
    <img src="images/brad.jpg" alt="吴勇" loading="lazy">
</picture>
```

## 2. 响应式图片

### 不同设备使用不同尺寸
```html
<img 
    srcset="images/brad-320w.jpg 320w,
            images/brad-640w.jpg 640w,
            images/brad-1024w.jpg 1024w"
    sizes="(max-width: 320px) 280px,
           (max-width: 640px) 600px,
           1024px"
    src="images/brad-1024w.jpg"
    alt="吴勇"
    loading="lazy">
```

## 3. 图片压缩

### 在线工具
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/

### 命令行工具
```bash
# 安装 imagemagick
brew install imagemagick

# 批量转换为 WebP
for file in images/*.jpg; do
    cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done

# 批量压缩 JPEG
for file in images/*.jpg; do
    convert "$file" -quality 85 -strip "$file"
done

# 批量压缩 PNG
for file in images/*.png; do
    pngquant --quality=65-80 --ext .png --force "$file"
done
```

## 4. 懒加载实现

### HTML 原生懒加载
```html
<img src="image.jpg" loading="lazy" alt="描述">
```

### JavaScript 增强懒加载
已在 `js/new-script.js` 中实现：
```javascript
// 使用 IntersectionObserver
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});
```

## 5. CDN 加速

### 推荐 CDN 服务
- **jsDelivr**: 免费，支持 GitHub
- **Cloudflare**: 免费套餐
- **七牛云**: 国内访问快
- **阿里云 OSS**: 稳定可靠

### 使用示例
```html
<!-- 使用 jsDelivr 加速 GitHub 图片 -->
<img src="https://cdn.jsdelivr.net/gh/bradoo/bradoo.github.io@main/images/brad.jpg" alt="吴勇">
```

## 6. 图片尺寸建议

### 推荐尺寸
| 用途 | 尺寸 | 格式 | 质量 |
|------|------|------|------|
| 头像 | 400x400 | WebP/JPEG | 85% |
| 博客配图 | 1200x630 | WebP/JPEG | 80% |
| 缩略图 | 300x200 | WebP/JPEG | 75% |
| 背景图 | 1920x1080 | WebP/JPEG | 80% |
| 图标 | SVG或PNG | SVG/PNG | - |
| Logo | 512x512 | PNG/SVG | - |

## 7. 批量优化脚本

### 创建优化脚本
```bash
#!/bin/bash
# optimize-images.sh

echo "开始优化图片..."

# 创建输出目录
mkdir -p images/optimized

# 优化 JPEG
for file in images/*.jpg; do
    filename=$(basename "$file")
    echo "处理: $filename"
    
    # 压缩原图
    convert "$file" -quality 85 -strip "images/optimized/$filename"
    
    # 生成 WebP
    cwebp -q 80 "$file" -o "images/optimized/${filename%.jpg}.webp"
    
    # 生成不同尺寸
    convert "$file" -resize 320x "images/optimized/${filename%.jpg}-320w.jpg"
    convert "$file" -resize 640x "images/optimized/${filename%.jpg}-640w.jpg"
    convert "$file" -resize 1024x "images/optimized/${filename%.jpg}-1024w.jpg"
done

# 优化 PNG
for file in images/*.png; do
    filename=$(basename "$file")
    echo "处理: $filename"
    
    # 压缩原图
    pngquant --quality=65-80 --ext .png --force "$file"
    cp "$file" "images/optimized/$filename"
    
    # 生成 WebP
    cwebp -q 80 "$file" -o "images/optimized/${filename%.png}.webp"
done

echo "优化完成！"
```

## 8. 性能监控

### 检查图片加载性能
```javascript
// 在浏览器控制台运行
const images = document.querySelectorAll('img');
let totalSize = 0;

images.forEach(img => {
    fetch(img.src)
        .then(response => response.blob())
        .then(blob => {
            totalSize += blob.size;
            console.log(`${img.src}: ${(blob.size / 1024).toFixed(2)} KB`);
        });
});

setTimeout(() => {
    console.log(`总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}, 3000);
```

## 9. 实施步骤

### 第一阶段：基础优化
1. ✅ 添加 `loading="lazy"` 到所有图片
2. ⏳ 压缩现有图片（减少30-50%体积）
3. ⏳ 为关键图片生成 WebP 格式

### 第二阶段：响应式优化
1. ⏳ 为大图片生成多个尺寸
2. ⏳ 使用 `srcset` 和 `sizes` 属性
3. ⏳ 实现 `<picture>` 标签

### 第三阶段：高级优化
1. ⏳ 配置 CDN 加速
2. ⏳ 实现渐进式图片加载
3. ⏳ 添加图片占位符（LQIP）

## 10. 预期效果

### 优化前
- 首页图片总大小: ~5MB
- LCP: ~7.3s
- 页面加载时间: ~7.4s

### 优化后（预期）
- 首页图片总大小: ~2MB ⬇️ 60%
- LCP: ~3s ⬇️ 59%
- 页面加载时间: ~3.5s ⬇️ 53%

## 11. 自动化工具

### GitHub Actions 自动优化
创建 `.github/workflows/optimize-images.yml`:
```yaml
name: Optimize Images

on:
  push:
    paths:
      - 'images/**'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Optimize images
        uses: calibreapp/image-actions@main
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          jpegQuality: 85
          pngQuality: 85
          webpQuality: 85
```

## 12. 最佳实践

### ✅ 应该做的
- 使用现代图片格式（WebP/AVIF）
- 提供多种尺寸和格式
- 使用懒加载
- 压缩图片
- 使用 CDN
- 添加 alt 属性
- 设置宽高属性防止布局偏移

### ❌ 不应该做的
- 使用未压缩的原图
- 所有设备使用相同尺寸
- 忘记添加 alt 属性
- 使用过低的压缩质量
- 忽略图片格式兼容性

## 13. 工具推荐

### 在线工具
- **PageSpeed Insights**: 性能分析
- **WebPageTest**: 详细性能报告
- **Lighthouse**: Chrome 内置工具

### 浏览器扩展
- **Image Size Info**: 查看图片尺寸
- **Lighthouse**: 性能审计

### 开发工具
- **ImageMagick**: 命令行图片处理
- **Sharp**: Node.js 图片处理库
- **Squoosh CLI**: 命令行压缩工具

## 14. 参考资源

- [Web.dev - 图片优化](https://web.dev/fast/#optimize-your-images)
- [MDN - 响应式图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Can I Use - WebP](https://caniuse.com/webp)

---

**更新日期**: 2026-04-16  
**维护者**: 吴勇