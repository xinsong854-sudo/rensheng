#!/bin/bash
# Cloudflare Tunnel 部署脚本
# 用法：./deploy-cloudflared.sh <端口> <目录>

PORT=${1:-8888}
DIR=${2:-.}

echo "🚀 启动 Cloudflare Tunnel 部署..."

# 检查 cloudflared 是否存在
if [ ! -f /tmp/cloudflared-linux-amd64 ]; then
    echo "⬇️  下载 cloudflared..."
    cd /tmp
    wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
    chmod +x cloudflared-linux-amd64
fi

# 启动 HTTP 服务器
echo "📡 启动本地服务器（端口 $PORT）..."
cd "$DIR"
python3 -m http.server "$PORT" &
SERVER_PID=$!

# 等待服务器启动
sleep 2

# 启动 Cloudflare Tunnel
echo "🌐 创建 Cloudflare 隧道..."
/tmp/cloudflared-linux-amd64 tunnel --url "http://localhost:$PORT" 2>&1 | grep -o 'https://[^ ]*trycloudflare\.com'

echo "✅ 部署完成！"
echo "服务器 PID: $SERVER_PID"
