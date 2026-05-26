#!/bin/bash

# Update package list and install necessary packages
apt-get update
apt-get install -y nginx curl git

# Set up a simple web server
echo '<!DOCTYPE html><html><head><title>TechCorp Internal Portal</title></head><body>' > /var/www/html/index.html
echo '<h1>TechCorp Internal Portal</h1>' >> /var/www/html/index.html
echo '<p>Welcome to the internal company portal. Authorized personnel only.</p>' >> /var/www/html/index.html
echo '<p><a href="/reports/">Reports</a> | <a href="/uploads/">Uploads</a></p>' >> /var/www/html/index.html
echo '</body></html>' >> /var/www/html/index.html

# Start nginx service
service nginx start

# Create realistic directory structure
mkdir -p /var/www/html/uploads
mkdir -p /var/www/html/reports
mkdir -p /home/workshop/projects
mkdir -p /home/workshop/.ssh
mkdir -p /opt/techcorp/backups
mkdir -p /opt/techcorp/scripts
mkdir -p /tmp/.cache

chmod 777 /var/www/html/uploads

# Create fake sensitive files
echo 'DB_HOST=10.0.1.50
DB_PORT=5432
DB_NAME=techcorp_production
DB_USER=tc_admin
DB_PASS=Pr0d#Secr3t!2024
REDIS_URL=redis://10.0.1.51:6379
AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
JWT_SECRET=super-secret-jwt-key-do-not-share' > /opt/techcorp/.env

echo '-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWep4PAtGoLFt0pM9aAfaGEMnXdXOOV
FakeKeyDataHereForDemoPurposesOnly1234567890ABCDEF
ThisIsNotARealKeyItIsForWorkshopDemonstrationOnly
-----END RSA PRIVATE KEY-----' > /home/workshop/.ssh/id_rsa
chmod 600 /home/workshop/.ssh/id_rsa

echo '# TechCorp Backup Script - Runs nightly at 2AM
#!/bin/bash
tar -czf /opt/techcorp/backups/db_backup_$(date +%Y%m%d).tar.gz /var/lib/postgresql/
scp /opt/techcorp/backups/*.tar.gz backup@10.0.1.100:/mnt/backups/
# TODO: fix permissions issue - running as root for now' > /opt/techcorp/scripts/backup.sh
chmod +x /opt/techcorp/scripts/backup.sh

echo '#!/usr/bin/python3
# Internal health check - runs with elevated privileges
import os, subprocess
result = subprocess.run(["systemctl", "status", "nginx"], capture_output=True)
print(result.stdout.decode())' > /opt/techcorp/scripts/healthcheck.py
chmod +x /opt/techcorp/scripts/healthcheck.py

echo 'Q3 Revenue Report - CONFIDENTIAL
Total Revenue: $4.2M
New Contracts: 15
Lost Accounts: 3
Notes: Migration to new cloud provider scheduled for Q4' > /var/www/html/reports/q3-revenue.txt

echo 'server_list:
  - web01.techcorp.local (192.168.1.10)
  - web02.techcorp.local (192.168.1.11)
  - db01.techcorp.local (10.0.1.50)
  - redis01.techcorp.local (10.0.1.51)
  - backup.techcorp.local (10.0.1.100)
credentials:
  ssh_user: deploy
  ssh_pass: D3pl0y_2024!' > /opt/techcorp/scripts/inventory.yml

# Create bash history for realism
echo 'cd /opt/techcorp
cat .env
sudo systemctl restart nginx
mysql -u tc_admin -pPr0d#Secr3t!2024 techcorp_production
scp backup.tar.gz deploy@10.0.1.100:/mnt/backups/
sudo /opt/techcorp/scripts/healthcheck.py
curl http://localhost:3000/api/search?q=test
find / -perm -4000 2>/dev/null' > /home/workshop/.bash_history

chown -R workshop:workshop /home/workshop

# Set up vulnerable sudoers file
cp /target/vulnerable-sudoers /etc/sudoers.d/vulnerable
chmod 440 /etc/sudoers.d/vulnerable

# Install Wazuh Agent
ARCH=$(dpkg --print-architecture)
if [ "$ARCH" = "arm64" ]; then
  DEB_URL="https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.9.0-1_arm64.deb"
else
  DEB_URL="https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.9.0-1_amd64.deb"
fi
curl -so wazuh-agent.deb "$DEB_URL"
WAZUH_MANAGER="wazuh.manager" WAZUH_AGENT_NAME="ubuntu-target" dpkg -i ./wazuh-agent.deb
rm -f wazuh-agent.deb

# Fix agent config and permissions
sed -i 's/MANAGER_IP/wazuh.manager/g' /var/ossec/etc/ossec.conf
groupadd -r wazuh 2>/dev/null || true
useradd -r -g wazuh -d /var/ossec -s /sbin/nologin wazuh 2>/dev/null || true
chown -R wazuh:wazuh /var/ossec

# Start Wazuh agent
/var/ossec/bin/wazuh-control start || true

# Print completion message
echo "Setup complete. The vulnerable web application is running."