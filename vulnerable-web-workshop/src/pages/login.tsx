import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                setMessage(data.error || 'Invalid credentials');
            }
        } catch (error: any) {
            setMessage('Connection error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.5rem', color: '#f1f5f9' }}>🏢 TechCorp Portal</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Employee Management System v2.4.1</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="button" type="submit" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                {message && <p className="error" style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
                <p style={{ color: '#475569', fontSize: '0.75rem', textAlign: 'center', marginTop: '1.5rem' }}>
                    Authorized personnel only. All access is monitored and logged.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
