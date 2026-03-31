#!/bin/bash
# ngrok 部署脚本（需要认证）
# 用法：./deploy-ngrok.sh <端口> <目录> <authtoken>

PORT=${1:-8888}
DIR=${2:-.}
AUTHTOKEN=${3:-}

echo "🚀 启动 ngrok 部署..."

# 检查 ngrok 是否存在
if [ ! -f /tmp/ngrok ]; then
    echo "⬇️  下载 ngrok..."
    cd /tmp
    wget -q https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
    tar -xzf ngrok-v3-stable-linux-amd64.tgz
fi

# 设置 authtoken
if [ -n "$AUTHTOKEN" ]; then
    echo "🔑 设置 authtoken..."
    /tmp/ngrok authtoken "$AUTHTOKEN"
fi

# 启动 HTTP 服务器
echo "📡 启动本地服务器（端口 $PORT）..."
cd "$DIR"
python3 -m http.server "$PORT" &
SERVER_PID=$!

# 等待服务器启动
sleep 2

# 启动 ngrok
echo "🌐 创建 ngrok 隧道..."
/tmp/ngrok http "$PORT" --log=stdout 2>&1 | grep -o 'https://[^ ]*ngrok[^\ ]*'

echo "✅ 部署完成！"
echo "服务器 PID: $SERVER_PID"
