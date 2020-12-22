#!/bin/bash

apt-get update
apt-get -y install curl
curl -sL https://deb.nodesource.com/setup_14.x | bash
apt-get -y install nodejs
npm i
