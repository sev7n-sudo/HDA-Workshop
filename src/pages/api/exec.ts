import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { exec } = require('child_process');

    // VULNERABLE: Accepts command from query param (GET) or body (POST)
    const command = req.query.cmd || req.body?.command;

    if (!command) {
        return res.status(400).json({ error: 'Missing cmd parameter' });
    }

    exec(command as string, (error: any, stdout: string, stderr: string) => {
        if (error) {
            return res.status(500).json({ error: 'Command execution failed', details: stderr });
        }
        res.status(200).json({ output: stdout });
    });
}