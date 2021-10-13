cp /etc/tls/privkey1.pem ./key.pem && cp /etc/tls/cert1.pem ./cert.pem && cp /etc/tls/adminsdk.json ./packages/server/top_secret/adminsdk.json

cp packages/client/build/index.html packages/client/build/404.html

mv packages/client/build packages/site/build/game

concurrently --kill-others-on-fail "yarn start:server" "http-server packages/site/build --ssl --log-ip --utc --cert cert.pem --key key.pem --port 80"