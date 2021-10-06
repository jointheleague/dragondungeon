cp /etc/tls/privkey1.pem ./key.pem && cp /etc/tls/cert1.pem ./cert.pem

mv 

concurrently --kill-others-on-fail "yarn start:server" ""