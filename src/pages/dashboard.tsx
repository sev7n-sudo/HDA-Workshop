import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const employees = [
  { id: 'EMP-001', name: 'John Smith', department: 'Engineering', position: 'Senior Developer', status: 'Active' },
  { id: 'EMP-002', name: 'Sarah Connor', department: 'Security', position: 'Analyst', status: 'Active' },
  { id: 'EMP-003', name: 'Mike Chen', department: 'Operations', position: 'DevOps Manager', status: 'Active' },
  { id: 'EMP-004', name: 'Emily Jones', department: 'Engineering', position: 'Junior Developer', status: 'Active' },
  { id: 'EMP-005', name: 'Alex Kumar', department: 'HR', position: 'Recruiter', status: 'On Leave' },
  { id: 'EMP-006', name: 'Lisa Park', department: 'Finance', position: 'Accountant', status: 'Active' },
  { id: 'EMP-007', name: 'David Wilson', department: 'Engineering', position: 'Intern', status: 'Active' },
];

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (!token || !userData) {
            router.replace('/login');
            return;
        }
        setUser(JSON.parse(userData));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (!user) return null;

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ color: '#f1f5f9', fontSize: '1.75rem' }}>📊 Dashboard</h1>
                    <p style={{ color: '#64748b' }}>Welcome back, <strong style={{ color: '#60a5fa' }}>{user.username}</strong> ({user.role})</p>
                </div>
                <button className="button button-danger" onClick={handleLogout}>Logout</button>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card" style={{ textAlign: 'center', marginBottom: 0 }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Total Employees</p>
                    <h2 style={{ color: '#4ade80', fontSize: '2rem' }}>47</h2>
                </div>
                <div className="card" style={{ textAlign: 'center', marginBottom: 0 }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Departments</p>
                    <h2 style={{ color: '#60a5fa', fontSize: '2rem' }}>6</h2>
                </div>
                <div className="card" style={{ textAlign: 'center', marginBottom: 0 }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Pending Reports</p>
                    <h2 style={{ color: '#fbbf24', fontSize: '2rem' }}>12</h2>
                </div>
                <div className="card" style={{ textAlign: 'center', marginBottom: 0 }}>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Uploaded Files</p>
                    <h2 style={{ color: '#f87171', fontSize: '2rem' }}>89</h2>
                </div>
            </div>

            {/* Navigation Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card" style={{ cursor: 'pointer', marginBottom: 0 }} onClick={() => router.push('/search')}>
                    <h2>🔍 Search</h2>
                    <p>Search products & inventory database</p>
                </div>
                <div className="card" style={{ cursor: 'pointer', marginBottom: 0 }} onClick={() => router.push('/upload')}>
                    <h2>📁 File Upload</h2>
                    <p>Upload documents and reports</p>
                </div>
            </div>

            {/* Employee Table */}
            <div className="card">
                <h2 style={{ marginBottom: '1rem' }}>👥 Employee Directory</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #334155' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8' }}>ID</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8' }}>Name</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8' }}>Department</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8' }}>Position</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid #1e293b' }}>
                                <td style={{ padding: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>{emp.id}</td>
                                <td style={{ padding: '0.75rem', color: '#e2e8f0' }}>{emp.name}</td>
                                <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{emp.department}</td>
                                <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{emp.position}</td>
                                <td style={{ padding: '0.75rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: emp.status === 'Active' ? '#064e3b' : '#78350f',
                                        color: emp.status === 'Active' ? '#6ee7b7' : '#fde68a'
                                    }}>{emp.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Dashboard;