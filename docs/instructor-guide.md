# Instructor Guide for Vulnerable Web Workshop

## Overview
This guide is designed to assist instructors in conducting the Vulnerable Web Workshop. The workshop aims to teach students about web vulnerabilities using a Next.js and React application. Students will learn to identify and exploit various vulnerabilities, culminating in privilege escalation on an Ubuntu server.

## Workshop Structure
The workshop is divided into several steps, each focusing on a specific type of vulnerability. Instructors should guide students through each step, providing explanations and assistance as needed.

### Step Breakdown
1. **Reconnaissance**
   - Introduce students to reconnaissance techniques.
   - Tools: Nmap, Burp Suite, etc.
   - Objective: Gather information about the target application.

2. **SQL Injection**
   - Explain SQL injection vulnerabilities.
   - Demonstrate how to exploit them using the provided API.
   - Objective: Extract sensitive data from the database.

3. **Broken Authentication**
   - Discuss common authentication flaws.
   - Guide students in exploiting these vulnerabilities.
   - Objective: Bypass authentication mechanisms.

4. **File Upload RCE**
   - Introduce file upload vulnerabilities.
   - Show how to upload malicious files to achieve remote code execution.
   - Objective: Execute arbitrary code on the server.

5. **Command Injection**
   - Explain command injection vulnerabilities.
   - Guide students in executing arbitrary commands on the server.
   - Objective: Gain unauthorized access to the server.

6. **Reverse Shell**
   - Discuss reverse shell techniques.
   - Demonstrate how to establish a reverse shell connection.
   - Objective: Maintain access to the compromised server.

7. **Privilege Escalation on Ubuntu**
   - Explain privilege escalation techniques specific to Ubuntu.
   - Guide students in exploiting misconfigurations to gain root access.
   - Objective: Achieve full control over the server.

## Commands and Tools
Provide students with a list of commands and tools they will need throughout the workshop. This includes:

- **Nmap**: For network scanning.
- **Burp Suite**: For intercepting and modifying requests.
- **SQLMap**: For automating SQL injection attacks.
- **Netcat**: For establishing reverse shells.
- **Linux Commands**: Basic commands for navigating and manipulating files on the server.

## Tips for Instructors
- Encourage students to ask questions and collaborate.
- Provide hints and guidance without giving away solutions.
- Ensure that students understand the ethical implications of exploiting vulnerabilities.
- Emphasize the importance of responsible disclosure and securing applications.

## Conclusion
By the end of the workshop, students should have a solid understanding of web vulnerabilities and the skills to identify and exploit them. Instructors should encourage continued learning and exploration of web security topics beyond the workshop.