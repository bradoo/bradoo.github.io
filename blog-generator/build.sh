#!/bin/bash
# 博客构建和部署脚本

echo "================================"
echo "  博客生成器 - 自动化构建"
echo "================================"

# 检查 Python 环境
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 Python3"
    echo "请先安装 Python 3.7 或更高版本"
    exit 1
fi

# 检查依赖
echo "📦 检查依赖..."
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "安装依赖包..."
pip install -q markdown jinja2 pyyaml python-frontmatter

# 运行生成器
echo ""
echo "🚀 开始生成静态页面..."
python3 blog-generator/generator.py

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 构建成功！"
    echo ""
    
    # 询问是否部署
    read -p "是否要部署到 GitHub Pages? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "📤 开始部署..."
        
        # Git 操作
        git add .
        git status
        
        echo ""
        read -p "请输入提交信息: " commit_msg
        
        if [ -z "$commit_msg" ]; then
            commit_msg="更新博客内容 $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        
        git commit -m "$commit_msg"
        git push origin main
        
        echo ""
        echo "✅ 部署完成！"
        echo "🌐 访问: https://bradoo.github.io"
    fi
else
    echo ""
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

deactivate

# Made with Bob
