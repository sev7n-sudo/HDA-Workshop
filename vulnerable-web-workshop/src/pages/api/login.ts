import { NextApiRequest, NextApiResponse } from 'next';

const users = [
  { id: 1, username: 'admin', password: 'sarah123', email: 'admin@techcorp.local', role: 'admin' },
  { id: 2, username: 'jsmith', password: 'Welcome1!', email: 'john.smith@techcorp.local', role: 'user' },
  { id: 3, username: 'sarah.connor', password: 'Terminator2!', email: 'sarah.connor@techcorp.local', role: 'user' },
  { id: 4, username: 'mike.chen', password: 'Dragon2024', email: 'mike.chen@techcorp.local', role: 'manager' },
  { id: 5, username: 'emily.jones', password: 'Summer2024!', email: 'emily.jones@techcorp.local', role: 'user' },
  { id: 6, username: 'devops', password: 'Deploy#2024', email: 'devops@techcorp.local', role: 'admin' },
  { id: 7, username: 'intern', password: 'Password1', email: 'intern@techcorp.local', role: 'guest' },
  { id: 8, username: 'root', password: 'toor', email: 'root@techcorp.local', role: 'superadmin' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // VULNERABLE: SQL-injection-style logic — accepts any password if username contains ' OR
    // This simulates a vulnerable query: SELECT * FROM users WHERE username='...' AND password='...'
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      res.status(200).json({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token.' + Buffer.from(user.username).toString('base64'),
        user: { id: user.id, username: user.username, email: user.email, role: user.role }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}