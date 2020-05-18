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
    teamArray=()
    for ((i=1;i<=5;i++)); 
    do if ((RANDOM % 2))
    then teamArray+=("Team_$i"); fi; done;
    if [ ${#teamArray[@]} -eq 0 ];
    then teamArray+="Team_$(( RANDOM % 5 + 1))"; fi;
    TEAMS=$(printf '%s\n' "${teamArray[@]}" | jq -R . | jq -s .)
    echo -e "Task: ${TASK}\nDate: ${DATE}\nDeadline: ${DEADLINE}\nUrgency: ${URGENCY}\nTeam: ${TEAMS}"
    #curl -d '{"task":"'$TASK'","date":"'$DATE'","deadline":"'$DEADLINE'","urgency":'$URGENCY',"team":"'$TEAMS'","completed":"false"}' -H "Content-Type: application/json" -X POST http://localhost:8000/tasks
done