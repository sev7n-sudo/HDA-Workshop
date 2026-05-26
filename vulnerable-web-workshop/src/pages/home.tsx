import Link from 'next/link';

export default function Home() {
  const modules = [
    { title: 'Reconnaissance', desc: 'Gather information about the target web application.' },
    { title: 'SQL Injection', desc: 'Exploit SQL vulnerabilities to manipulate databases.' },
    { title: 'Broken Authentication', desc: 'Bypass authentication to gain unauthorized access.' },
    { title: 'File Upload & RCE', desc: 'Exploit file uploads for remote code execution.' },
    { title: 'Command Injection', desc: 'Execute arbitrary commands on the server.' },
    { title: 'Reverse Shell', desc: 'Establish remote access via a reverse shell.' },
    { title: 'Privilege Escalation', desc: 'Escalate privileges on an Ubuntu target system.' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#60a5fa' }}>
          🛡️ Vulnerable Web Workshop
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
          A hands-on cybersecurity workshop where you&#39;ll learn to identify and exploit common web vulnerabilities in a safe, controlled environment.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e2e8f0' }}>What You&#39;ll Learn</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem', textAlign: 'left' }}>
          {modules.map((m, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #334155' }}>
              <h3 style={{ fontSize: '1rem', color: '#60a5fa', marginBottom: '0.4rem' }}>
                {i + 1}. {m.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{m.desc}</p>
            </div>
          ))}
        </div>

        <Link href="/login" style={{
          display: 'inline-block',
          padding: '0.85rem 2.5rem',
          background: '#2563eb',
          color: '#fff',
          borderRadius: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}>
          Get Started →
        </Link>
      </div>
    </div>
  );
}
