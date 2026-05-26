# Step 3: Broken Authentication

In this step, we will explore broken authentication vulnerabilities within our web application. Broken authentication occurs when an application improperly implements authentication mechanisms, allowing attackers to compromise user accounts or gain unauthorized access.

## Objectives

- Understand the concept of broken authentication.
- Identify vulnerabilities in the login process.
- Exploit the vulnerabilities to gain unauthorized access.

## Vulnerable Code

The login functionality is implemented in `src/pages/api/login.ts`. Review the code to identify potential vulnerabilities. Look for:

- Lack of rate limiting on login attempts.
- Insecure password storage (e.g., plain text).
- Absence of account lockout mechanisms.

## Exploitation Steps

1. **Brute Force Attack**: 
   Use a tool like `Hydra` or `Burp Suite` to perform a brute force attack on the login endpoint. The endpoint is located at `/api/login`.

   Example command using Hydra:
   ```
   hydra -l <username> -P <path_to_password_list> http://<target_ip>/api/login
   ```

2. **Session Fixation**:
   After logging in, check if the session token changes. If it does not, you can exploit this by forcing a user to log in with your session token.

3. **Token Manipulation**:
   If the application uses JWT or similar tokens, try manipulating the token to gain access to other users' sessions.

4. **Bypass Authentication**:
   Check if you can bypass authentication by manipulating the request parameters or headers.

## Commands to Run

- To test the login API, you can use `curl`:
  ```
  curl -X POST http://<target_ip>/api/login -d '{"username":"<username>","password":"<password>"}' -H "Content-Type: application/json"
  ```

- Monitor the responses to identify any weaknesses in the authentication process.

## Conclusion

By the end of this step, you should have a better understanding of broken authentication vulnerabilities and how to exploit them. Ensure to document your findings and prepare for the next step, where we will explore file upload vulnerabilities leading to remote code execution.