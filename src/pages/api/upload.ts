import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

function parseMultipart(req: NextApiRequest): Promise<{ filename: string; data: Buffer }> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => {
            const body = Buffer.concat(chunks);
            const boundary = req.headers['content-type']?.split('boundary=')[1];
            if (!boundary) return reject(new Error('No boundary'));

            const bodyStr = body.toString();
            const filenameMatch = bodyStr.match(/filename="(.+?)"/);
            const filename = filenameMatch ? filenameMatch[1] : 'uploaded_file';

            // Find the file data between headers and boundary
            const headerEnd = body.indexOf('\r\n\r\n') + 4;
            const boundaryEnd = body.lastIndexOf(Buffer.from(`\r\n--${boundary}`));
            const fileData = body.slice(headerEnd, boundaryEnd);

            resolve({ filename, data: fileData });
        });
        req.on('error', reject);
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Ensure upload directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const { filename, data } = await parseMultipart(req);

            // VULNERABLE: No file type validation — allows any file upload
            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, data);

            return res.status(200).json({
                message: 'File uploaded successfully',
                filePath: `/uploads/${filename}`,
                size: data.length
            });
        } catch (err: any) {
            return res.status(500).json({ message: 'Error uploading file', error: err.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}