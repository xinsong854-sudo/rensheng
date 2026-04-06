#!/bin/bash

# Neta Like All - Bash version with rate limiting
# Processes users one at a time with delays to avoid rate limits

NETA_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzA1MTIsInV1aWQiOiJiOTFjMzc1MTE4NmQ0ZjY0OTU3NjY4NjE2ODM0NzkwMCIsInBob25lX251bSI6IjEzOTE4MTUwNDgwIiwiZXhwaXJlc19hdCI6MTc5ODY4ODI3NCwiaXNfcmVnaXN0ZXIiOmZhbHNlLCJ1c2VyX2FnZW50Ijoic2NyaXB0LWdlbmVyYXRlZCIsInNhbHQiOiI1MzVmMTM1OTI4OTA0ZTIyOWNlOWFjYzZiZWZjZmM4ZCJ9.gOIWorihXmlmcDn0b-HDNYyatvu12erGny7uT5-mPso"
MEMORY_FILE="/home/node/.openclaw/workspace/memory/liked-posts.json"

# User UUIDs (first batch - 10 users to test)
USERS=(
  "03a363afb33b4c1195a3084bdb400f85"
  "065c51c544ce46b691ba89ac9df6c86d"
  "1024f0bd80de43f5b765935b35701611"
  "1e79bb92d7ad4341885cdc47a6993368"
  "200f380f702949118c5e5cc434656c41"
)

echo "Starting Neta like task..."
echo "Processing ${#USERS[@]} users..."

for user_uuid in "${USERS[@]}"; do
  echo ""
  echo "Processing user: $user_uuid"
  
  # Get feed with retry
  max_retries=3
  retry=0
  feed_data=""
  
  while [ $retry -lt $max_retries ]; do
    if [ $retry -gt 0 ]; then
      wait_time=$((retry * 2000))
      echo "  Rate limited, waiting ${wait_time}ms..."
      sleep $((wait_time / 1000))
    fi
    
    feed_data=$(npx -y @talesofai/neta-skills@latest request_interactive_feed --scene "personal_feed" --target_user_uuid "$user_uuid" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$feed_data" ]; then
      break
    fi
    
    retry=$((retry + 1))
  done
  
  if [ -z "$feed_data" ] || [ "$feed_data" = "null" ]; then
    echo "  No feed data"
    sleep 2
    continue
  fi
  
  echo "  Got feed data"
  # Parse and process posts would go here
  
  # Delay between users
  sleep 3
done

echo "Done with first batch"
