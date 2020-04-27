#!/bin/bash
for i in $(seq 1 $1)
do
    TASK=$(curl https://random-word-api.herokuapp.com/word?number=2)
    TASK=$(echo ${TASK//[\"\[\]]/})
    TASK=$(echo "${TASK//,/$' '}")
    TASK=($TASK)
    TASK="${TASK[@]^}"
    TASK=$(echo "${TASK// /$'_'}")
    DATE=$(date --utc +%FT%TZ)
    DEADLINE=$(date --date='14 days' --utc +%FT%TZ)
    URGENCY=$(echo $RANDOM % 5 + 1 | bc)
    TEAM=$(echo Team_$(echo $RANDOM % 5 + 1 | bc))
    curl -d '{"task":"'$TASK'","date":"'$DATE'","deadline":"'$DEADLINE'","urgency":'$URGENCY',"team":"'$TEAM'","completed":"false"}' -H "Content-Type: application/json" -X POST http://localhost:8000/tasks
done