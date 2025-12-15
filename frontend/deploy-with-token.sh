#!/bin/bash
# 使用 Token 部署到 Vercel
# 使用方法: VERCEL_TOKEN="your-token" ./deploy-with-token.sh

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ 错误: 请设置 VERCEL_TOKEN 环境变量"
    echo "   使用方法: VERCEL_TOKEN=\"your-token\" ./deploy-with-token.sh"
    exit 1
fi

export VERCEL_TOKEN

echo "🚀 使用 Token 部署到 Vercel..."
echo "📦 项目名称: antufraudstamp"

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "安装 Vercel CLI..."
    npm install -g vercel@latest
fi

# 部署
vercel deploy --prod --yes --token "$VERCEL_TOKEN"

echo "✅ 部署完成！"
