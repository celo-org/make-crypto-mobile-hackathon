#!/usr/bin/env bash
echo "starting client container..."
docker run -it -p 4001:3000 client
echo "client container started"
echo "starting server container..."
docker run -it -p 4002:3001 server
echo "server container started"