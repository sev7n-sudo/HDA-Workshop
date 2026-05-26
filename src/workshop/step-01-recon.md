# Step 1: Reconnaissance

In this step, we will focus on reconnaissance techniques that are essential for understanding the target environment. This phase is crucial for gathering information that will help in identifying potential vulnerabilities.

## Objectives

- Understand the importance of reconnaissance in web application security.
- Learn how to gather information about the target application.
- Identify potential attack vectors based on the gathered information.

---

## Identifying Your IPs (Attacker & Victim)

Before you begin, you need to know **two IPs**:

| Role | Machine | How to Find |
|------|---------|-------------|
| **Attacker (You)** | Kali Linux | Run `ip a` or `hostname -I` on Kali |
| **Victim (Target)** | Host machine running Docker | Run `ipconfig getifaddr en0` (macOS) or `hostname -I` (Linux) on the host |

### On Kali (Attacker IP):
```bash
# Find your Kali IP address
ip a show eth0 | grep inet
# or
hostname -I
```
> Example output: `192.168.1.50` — this is your **attacker IP** (used for reverse shells later).

### On the Host Machine (Victim/Target IP):
```bash
# macOS
ipconfig getifaddr en0

# Linux
hostname -I | awk '{print $1}'
```
> Example output: `192.168.1.100` — this is the **target IP** where the vulnerable app runs.

### Verify Connectivity:
```bash
# From Kali, ping the host machine
ping -c 3 <target-ip>

# From Kali, check if the web app is reachable
curl http://<target-ip>:3010
```

> **Important:** Both machines must be on the **same network** (e.g., same Wi-Fi or bridged network for VMs). The vulnerable web app is accessible at `http://<target-ip>:3010`.

### Quick Summary:
```
┌─────────────────────┐                  ┌─────────────────────┐
│   Kali Linux        │                  │   Host Machine      │
│   (Attacker)        │  ◄── Same LAN ──►│   (Victim/Target)   │
│   IP: 192.168.1.50  │                  │   IP: 192.168.1.100 │
└─────────────────────┘                  │   Port: 3010        │
                                         └─────────────────────┘
```

---

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