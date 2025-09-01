#!/bin/bash
cd /home/kavia/workspace/code-generation/food-delivery-app-14946-15095/WebApplication
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

