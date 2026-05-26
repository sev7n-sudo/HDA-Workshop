# Step 5: Command Injection Vulnerabilities

In this step, we will explore command injection vulnerabilities, which occur when an application allows untrusted input to be executed as a command on the server. This can lead to unauthorized access and control over the server.

## Overview

Command injection vulnerabilities can be exploited by manipulating input fields that are used to execute system commands. In our application, we have an API endpoint that allows command execution. This is a critical vulnerability that we will demonstrate how to exploit.

## Target API Endpoint

The vulnerable API endpoint is located at `/api/exec`. This endpoint accepts a command as a query parameter and executes it on the server. 

### Example of Vulnerable Code

Here is a simplified example of how the command execution might be implemented:

```javascript
// src/pages/api/exec.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { command } = req.query;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }
        res.status(200).json({ output: stdout });
    });
}
```

## Exploitation Steps

1. **Identify the Vulnerability**: 
   - Navigate to the command execution API endpoint in your browser or using a tool like Postman.
   - The URL will look like this: `http://localhost:3000/api/exec?command=your_command_here`.

2. **Crafting the Payload**:
   - To exploit the command injection, you can append additional commands using `;` or `&&`. For example:
     ```
     http://localhost:3000/api/exec?command=ls;whoami
     ```
   - This command will list the files in the current directory and then execute `whoami` to display the current user.

3. **Executing the Command**:
   - Send the crafted request and observe the output. You should see the results of both commands executed on the server.

4. **Further Exploitation**:
   - You can try more dangerous commands, such as:
     ```
     http://localhost:3000/api/exec?command=cat /etc/passwd
     ```
   - This command attempts to read the contents of the `/etc/passwd` file, which can reveal user information on the server.

## Mitigation Strategies

To prevent command injection vulnerabilities, consider the following strategies:

- **Input Validation**: Always validate and sanitize user inputs to ensure they do not contain malicious commands.
- **Use Safe APIs**: Instead of executing shell commands directly, use safer APIs or libraries that do not expose the system shell.
- **Principle of Least Privilege**: Run your application with the least privileges necessary to limit the impact of a potential exploit.

## Conclusion

In this step, you learned about command injection vulnerabilities and how to exploit them using a vulnerable API endpoint. Understanding these vulnerabilities is crucial for developing secure applications and protecting against potential attacks.