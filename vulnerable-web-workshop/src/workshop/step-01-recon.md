# Step 1: Reconnaissance

In this step, we will focus on reconnaissance techniques that are essential for understanding the target environment. This phase is crucial for gathering information that will help in identifying potential vulnerabilities.

## Objectives

- Understand the importance of reconnaissance in web application security.
- Learn how to gather information about the target application.
- Identify potential attack vectors based on the gathered information.

## Tools and Techniques

1. **Information Gathering**:
   - Use tools like `curl` or `wget` to fetch pages and APIs.
   - Explore the application structure by navigating through the web interface.

2. **Directory and File Enumeration**:
   - Use tools like `gobuster` or `dirb` to discover hidden files and directories.
   - Example command:
     ```
     gobuster dir -u http://<target-url> -w /path/to/wordlist.txt
     ```

3. **Service Enumeration**:
   - Identify services running on the server using tools like `nmap`.
   - Example command:
     ```
     nmap -sV <target-ip>
     ```

4. **API Exploration**:
   - Investigate the API endpoints available in the application.
   - Use tools like Postman or Insomnia to test API endpoints.

5. **User Enumeration**:
   - Attempt to gather information about valid usernames through the login page.
   - Check for error messages that may reveal valid usernames.

## Commands to Run

- To fetch the homepage:
  ```
  curl http://<target-url>
  ```

- To check the login API:
  ```
  curl -X POST http://<target-url>/api/login -d '{"username":"test","password":"test"}' -H "Content-Type: application/json"
  ```

- To list files in the uploads directory (if accessible):
  ```
  curl http://<target-url>/uploads/
  ```

## Conclusion

Reconnaissance is a critical first step in the security assessment process. By gathering as much information as possible, you will be better equipped to identify vulnerabilities and plan your next steps in the workshop.