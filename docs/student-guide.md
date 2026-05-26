# Student Guide for Vulnerable Web Workshop

Welcome to the Vulnerable Web Workshop! This guide will help you navigate through the exercises and understand the vulnerabilities you will be exploring. 

## Workshop Overview

In this workshop, you will learn about various web vulnerabilities using a Next.js and React application. The goal is to understand how these vulnerabilities can be exploited and how to secure applications against them.

## Steps to Follow

### Step 1: Reconnaissance
- Familiarize yourself with the application.
- Use tools like `curl` or `wget` to explore the endpoints.
- Document your findings.

### Step 2: SQL Injection
- Navigate to the search functionality.
- Try injecting SQL commands into the search input.
- Observe how the application responds to your inputs.

### Step 3: Broken Authentication
- Attempt to bypass the login mechanism.
- Use common techniques such as password guessing or session fixation.

### Step 4: File Upload Vulnerabilities
- Go to the upload page.
- Try uploading files with different extensions (e.g., `.php`, `.exe`).
- Check if you can execute the uploaded files.

### Step 5: Command Injection
- Use the `/api/exec` endpoint to execute commands.
- Try running commands like `ls`, `whoami`, or `cat /etc/passwd`.
- Understand the implications of command injection vulnerabilities.

### Step 6: Reverse Shell
- Learn how to set up a reverse shell.
- Use the command injection vulnerability to gain a shell on the server.

### Step 7: Privilege Escalation on Ubuntu
- Once you have access to the server, explore the file system.
- Look for misconfigurations in the sudoers file.
- Attempt to escalate your privileges.

## Commands Cheatsheet
Refer to the `commands-cheatsheet.md` for a list of useful commands during the workshop.

## Important Notes
- Always follow ethical guidelines while performing these exercises.
- Do not attempt to exploit any systems outside of this workshop environment.
- Document your findings and share them with your peers for collaborative learning.

## Conclusion
By the end of this workshop, you should have a better understanding of web vulnerabilities and how to exploit them. Use this knowledge responsibly to help secure applications in the future. Happy hacking!