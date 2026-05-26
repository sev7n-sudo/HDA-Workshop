import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        fs.readdir(uploadsDir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to list files' });
            }
            res.status(200).json(files);
        });
    } else if (req.method === 'DELETE') {
        const { filename } = req.body;
        const filePath = path.join(uploadsDir, filename);

        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete file' });
            }
            res.status(200).json({ message: 'File deleted successfully' });
        });
    } else {
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}