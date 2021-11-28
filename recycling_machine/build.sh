#!/usr/bin/env bash
echo "building client container..."
docker build -f ./client/Dockerfile -t client ./client
echo "built client container"
echo "building server container..."
docker build -f ./server/Dockerfile -t server ./server
echo "built server container"