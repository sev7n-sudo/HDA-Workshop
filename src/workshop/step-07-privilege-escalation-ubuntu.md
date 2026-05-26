# Step 7: Privilege Escalation on Ubuntu

In this step, we will explore privilege escalation techniques specific to Ubuntu systems. This will help you understand how attackers can gain elevated access to systems and the importance of securing such vulnerabilities.

## Overview

Privilege escalation occurs when an attacker gains elevated access to resources that are normally protected from an application or user. In Ubuntu, this can often be achieved through misconfigurations, vulnerable software, or exploiting specific features of the operating system.

## Objectives

- Understand common privilege escalation techniques on Ubuntu.
- Learn how to identify and exploit vulnerabilities that can lead to privilege escalation.
- Execute commands to demonstrate privilege escalation in a controlled environment.

## Common Techniques

1. **Sudo Misconfigurations**: 
   - Check the `/etc/sudoers` file for users with unnecessary privileges.
   - Example command to view sudo privileges:
     ```
     sudo -l
     ```

2. **Kernel Exploits**:
   - Look for outdated kernels that may have known vulnerabilities.
   - Use tools like `searchsploit` to find potential exploits.

3. **Setuid and Setgid Files**:
   - Identify files with the setuid or setgid bit set that may be exploited.
   - Example command to find such files:
     ```
     find / -perm -4000 -o -perm -2000 -exec ls -l {} \;
     ```

4. **Weak File Permissions**:
   - Check for files and directories with weak permissions that can be modified by non-privileged users.

5. **Environment Variables**:
   - Exploit environment variables that can be manipulated to escalate privileges.

## Practical Exercise

1. **Access the Ubuntu Target**:
   - Use the provided Docker setup to run the vulnerable Ubuntu target.

2. **Identify Privilege Escalation Opportunities**:
   - Execute the commands listed above to identify potential vulnerabilities.

3. **Exploit the Vulnerabilities**:
   - Follow the instructions provided in the workshop to exploit the identified vulnerabilities.

4. **Gain Root Access**:
   - Use the exploited vulnerabilities to gain root access to the Ubuntu system.

## Commands to Run

- To check your current user:
  ```
  whoami
  ```

- To check for available sudo privileges:
  ```
  sudo -l
  ```

- To find setuid files:
  ```
  find / -perm -4000 -exec ls -la {} \;
  ```

- To check for kernel version:
  ```
  uname -r
  ```

## Conclusion

Privilege escalation is a critical aspect of security that can lead to severe consequences if not properly managed. Understanding these techniques will help you secure systems against unauthorized access and potential attacks. Always remember to practice ethical hacking and only test systems you have permission to access.