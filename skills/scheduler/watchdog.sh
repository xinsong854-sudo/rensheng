#!/bin/bash
# 调度器看门狗 - 每分钟检查，崩溃自动重启

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/scheduler.pid"
LOG_FILE="$SCRIPT_DIR/scheduler.log"
WATCHDOG_LOG="$SCRIPT_DIR/watchdog.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$WATCHDOG_LOG"
}

check_and_restart() {
    # 检查 PID 文件
    if [ ! -f "$PID_FILE" ]; then
        log "⚠️  PID 文件不存在，启动调度器"
        start_scheduler
        return
    fi
    
    PID=$(cat "$PID_FILE")
    
    # 检查进程是否存在
    if ! ps -p "$PID" > /dev/null 2>&1; then
        log "⚠️  进程 $PID 已死亡，重启调度器"
        rm -f "$PID_FILE"
        start_scheduler
        return
    fi
    
    # 检查是否僵死进程
    if ps -o stat= -p "$PID" | grep -q "Z"; then
        log "⚠️  进程 $PID 是僵死进程，重启调度器"
        kill -9 "$PID" 2>/dev/null
        rm -f "$PID_FILE"
        start_scheduler
        return
    fi
    
    # 正常
    log "✓ 调度器运行正常 (PID: $PID)"
}

start_scheduler() {
    cd "$SCRIPT_DIR"
    nohup node index.js > "$LOG_FILE" 2>&1 </dev/null &
    NEW_PID=$!
    echo "$NEW_PID" > "$PID_FILE"
    
    sleep 2
    
    if ps -p "$NEW_PID" > /dev/null 2>&1; then
        log "✓ 调度器已启动 (PID: $NEW_PID)"
    else
        log "✗ 调度器启动失败"
        rm -f "$PID_FILE"
    fi
}

# 主循环
log "=== 看门狗启动 ==="
while true; do
    check_and_restart
    sleep 60
done
