# Step 4: File Upload Vulnerability Leading to Remote Code Execution

In this step, we will explore a common vulnerability associated with file uploads that can lead to remote code execution (RCE). This vulnerability arises when an application allows users to upload files without proper validation and sanitization.

## Objective

The goal of this exercise is to demonstrate how an attacker can exploit a file upload vulnerability to execute arbitrary code on the server.

## Setup

1. **Navigate to the Upload Page**: Start by going to the upload page of the application. This can typically be accessed at `/upload`.

2. **Upload a Malicious File**: Create a file that contains malicious code. For example, you can create a PHP file with the following content:

   ```php
   <?php
   system($_GET['cmd']);
   ?>
   ```

   Save this file as `malicious.php`.

3. **Upload the File**: Use the file upload form to upload `malicious.php`. Ensure that the application does not restrict the file type or perform any checks on the uploaded file.

## Exploitation

Once the file is uploaded, you can execute commands on the server by accessing the uploaded file through the web browser. For example, if the file is accessible at `http://<your-server>/uploads/malicious.php`, you can execute a command by appending `?cmd=<your-command>` to the URL.

### Example Command Execution

To test the vulnerability, you can run a simple command like:

```
http://<your-server>/uploads/malicious.php?cmd=whoami
```

This command will return the username of the server process running the web application.

## Cleanup

After testing, make sure to delete the uploaded file to prevent further exploitation. You can do this through the file management API or by accessing the server directly.

## Important Notes

- Always validate and sanitize file uploads in real applications to prevent such vulnerabilities.
- This exercise is for educational purposes only. Do not attempt to exploit vulnerabilities on systems without permission.