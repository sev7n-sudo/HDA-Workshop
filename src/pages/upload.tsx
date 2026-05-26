import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const UploadPage = () => {
    const [file, setFile] = useState<any>(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('token')) router.replace('/login');
    }, []);

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('File uploaded successfully: ' + data.filePath);
            } else {
                setMessage('Error uploading file: ' + data.error);
            }
        } catch (error: any) {
            setMessage('Error uploading file: ' + error.message);
        }
    };

    return (
        <Layout>
            <div className="card" style={{ maxWidth: '550px', margin: '2rem auto' }}>
                <h1>📁 File Upload</h1>
                <p>Upload files to the server.</p>
                <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                    <div className="form-group">
                        <label>Select File</label>
                        <div className="file-input">
                            <input type="file" onChange={handleFileChange} />
                        </div>
                    </div>
                    <button className="button" type="submit" style={{ width: '100%' }}>
                        Upload
                    </button>
                </form>
                {message && (
                    <p className={message.includes('successfully') ? 'success' : 'error'} style={{ marginTop: '1rem' }}>
                        {message}
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default UploadPage;