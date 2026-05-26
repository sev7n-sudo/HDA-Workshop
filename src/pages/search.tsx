import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('token')) router.replace('/login');
    }, []);

    const handleSearch = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
    };

    return (
        <Layout>
            <div className="card">
                <h1>🔍 Search Products</h1>
                <p>Search the product database.</p>
                <form onSubmit={handleSearch} style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <input
                        className="input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter search query..."
                    />
                    <button className="button" type="submit">Search</button>
                </form>
            </div>
            {results.length > 0 && (
                <div className="card">
                    <h2>Results</h2>
                    <ul className="results-list">
                        {results.map((result: any, index: number) => (
                            <li key={index}>{typeof result === 'string' ? result : JSON.stringify(result)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Layout>
    );
};

export default SearchPage;