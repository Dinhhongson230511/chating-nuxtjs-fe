# Exit when any command fails
set -e

if [ -z "$1" ]; then
  echo "Error: Fill github branch at first parmeter, ex. sh deploy.sh dev"
  exit 0
fi

# Pull new source code
echo "Pulling new source code..."
git fetch origin $1
git checkout -f
git checkout $1
git pull origin $1

echo "Deploy starting..."
# Config environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

export NODE_OPTIONS=--max_old_space_size=4096

npm install || exit
npm run build || exit

pm2 reload ecosystem.config.js

# Load env for secret variable
if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

curl -X POST --data-urlencode "payload={\"channel\": \"#retty-inshokuten-yoyaku\", \"username\": \"Bot\", \"text\": \"@channel [retty.dev - partner-hare-inbound-fe] Server $NUXT_PUBLIC_AUTH_ORIGIN has been successfully deployed!\", \"icon_emoji\": \":ghost:\"}" $SLACK_PUSH_CHANNEL
echo "\nDeploy done."
exit 0
