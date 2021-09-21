docker build -f dev.Dockerfile -t dragondungeon-dev .
docker run -p 8080:8080 -p 8001:8001 -p 3000:3000 dragondungeon-dev