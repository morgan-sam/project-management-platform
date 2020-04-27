DATE=$(date --utc +%FT%TZ)

curl -d '{"task":"TEST_TASK","date": "'$DATE'","urgency":"3","completed":"true"}' -H "Content-Type: application/json" -X POST http://localhost:8000/tasks