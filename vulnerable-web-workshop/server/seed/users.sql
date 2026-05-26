CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, email, role) VALUES
('admin', 'sarah123', 'admin@techcorp.local', 'admin'),
('jsmith', 'Welcome1!', 'john.smith@techcorp.local', 'user'),
('sarah.connor', 'Terminator2!', 'sarah.connor@techcorp.local', 'user'),
('mike.chen', 'Dragon2024', 'mike.chen@techcorp.local', 'manager'),
('emily.jones', 'Summer2024!', 'emily.jones@techcorp.local', 'user'),
('devops', 'Deploy#2024', 'devops@techcorp.local', 'admin'),
('intern', 'Password1', 'intern@techcorp.local', 'guest'),
('root', 'toor', 'root@techcorp.local', 'superadmin');