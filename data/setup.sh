#!/bin/bash

sudo apt-get update
sudo apt-get install -y vsftpd

sudo ufw allow 20/ftp
sudo ufw allow 21/ftp

sudo cp /data/myvsftpd.conf /etc/vsftpd.conf
sudo systemctl restart vsftpd

sudo mkdir -p /var/ftp/public
sudo chown nobody:nobody /var/ftp/public
echo "test file" | sudo tee /var/ftp/public/test

