#!/bin/bash
node test.js

apt-get update
apt-get -q -y install git
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
apt-get install nodejs npm
