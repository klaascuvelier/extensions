#!/bin/bash

privatekey=$1
source=$2
target=$3
host=$4

IFS="," read -r -a preDeploy <<< "$5"
IFS="," read -r -a postDeploy <<< "$6"

# verify target is absolute path
if [[ ! $target == /* ]]
then
    echo "target (${target}) should be an absolute path"
    exit 1
fi

# create new ssh-agent session and add private key
echo "🖥 Setting up connection"
eval $(ssh-agent -s) >> /dev/null
#ssh-add $privatekey <--- only needed on server

for command in "${preDeploy[@]}"
do
    ssh -p22 ${host} "$command"
done

# create new folder
echo "☁ Syncing data"
ssh -p22 ${host} "rm -rf ${target}/*" # remove possible old data
ssh -p22 ${host} "mkdir -p ${target}"
rsync -a -q ${source} ${host}:${target}

for command in "${postDeploy[@]}"
do
    ssh -p22 ${host} "$command"
done

# ready
echo "✅ Done"
