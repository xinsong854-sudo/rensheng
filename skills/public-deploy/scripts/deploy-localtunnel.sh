#!/bin/bash
# localtunnel 部署脚本
# 用法：./deploy-localtunnel.sh <端口> <目录>

PORT=${1:-8888}
DIR=${2:-.}

echo "🚀 启动 localtunnel 部署..."

# 启动 HTTP 服务器
echo "📡 启动本地服务器（端口 $PORT）..."
cd "$DIR"
python3 -m http.server "$PORT" &
SERVER_PID=$!

# 等待服务器启动
sleep 2

# 启动 localtunnel
echo "🌐 创建 localtunnel 隧道..."
npx localtunnel --port "$PORT" 2>&1 | grep -o 'https://[^ ]*loca\.lt'

echo "✅ 部署完成！"
echo "⚠️  首次访问需要输入 IP 验证"
echo "服务器 PID: $SERVER_PID"
