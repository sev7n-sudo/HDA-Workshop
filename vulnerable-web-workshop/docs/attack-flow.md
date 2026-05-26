# Attack Flow for Vulnerable Web Workshop

## Overview
This document outlines the sequence of attacks that students will learn and perform during the workshop. Each step will guide students through the process of identifying and exploiting vulnerabilities in a web application built with Next.js and React.

## Attack Steps

### Step 1: Reconnaissance
- **Objective**: Gather information about the target application.
- **Commands**:
  - Use tools like `curl` or `wget` to fetch pages.
  - Explore the application structure and endpoints.

### Step 2: SQL Injection
- **Objective**: Exploit SQL injection vulnerabilities in the application.
- **Commands**:
  - Test input fields with common SQL injection payloads.
  - Use tools like `sqlmap` for automated exploitation.

### Step 3: Broken Authentication
- **Objective**: Identify and exploit weaknesses in the authentication mechanism.
- **Commands**:
  - Attempt to bypass login using default credentials or brute force.
  - Analyze session management for vulnerabilities.

### Step 4: File Upload Vulnerabilities
- **Objective**: Exploit file upload functionality to achieve remote code execution.
- **Commands**:
  - Upload a malicious file (e.g., a web shell).
  - Access the uploaded file to execute commands on the server.

### Step 5: Command Injection
- **Objective**: Perform command injection through vulnerable API endpoints.
- **Commands**:
  - Use payloads that inject system commands into API requests.
  - Test for command execution through the `exec.ts` endpoint.

### Step 6: Reverse Shell
- **Objective**: Establish a reverse shell to gain remote access to the server.
- **Commands**:
  - Use the command injection vulnerability to spawn a reverse shell.
  - Connect back to the attacker's machine using tools like `nc` or `bash`.

### Step 7: Privilege Escalation on Ubuntu
- **Objective**: Escalate privileges on the Ubuntu server.
- **Commands**:
  - Identify misconfigured sudoers settings.
  - Exploit these settings to gain root access.

## Conclusion
By following these steps, students will gain hands-on experience in identifying and exploiting common web vulnerabilities. Each attack will be accompanied by practical exercises to reinforce learning and understanding of security concepts.