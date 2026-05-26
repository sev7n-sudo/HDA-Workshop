CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL,
  category TEXT,
  sku TEXT,
  stock INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, category, sku, stock) VALUES
('CloudSync Pro License', 'Enterprise cloud synchronization platform with real-time collaboration features.', 299.99, 'Software', 'CSP-2024-001', 500),
('SecureVault USB Key', 'Hardware encryption key for two-factor authentication. FIDO2 compliant.', 49.99, 'Hardware', 'SVK-HW-042', 1200),
('DevOps Pipeline Toolkit', 'CI/CD automation suite with container orchestration and deployment tools.', 599.99, 'Software', 'DPT-ENT-100', 85),
('Network Probe Analyzer', 'Deep packet inspection tool for network diagnostics and monitoring.', 149.99, 'Hardware', 'NPA-NET-007', 320),
('DataLake Storage (1TB)', 'Scalable object storage solution with built-in redundancy and encryption.', 89.99, 'Cloud Services', 'DLS-1TB-STD', 9999),
('API Gateway Enterprise', 'High-performance API management with rate limiting and OAuth2 support.', 449.99, 'Software', 'AGE-API-200', 150),
('Wireless Pentest Adapter', 'Dual-band WiFi adapter with monitor mode and packet injection support.', 79.99, 'Hardware', 'WPA-SEC-013', 45),
('ThreatWatch SIEM', 'Security information and event management with ML-powered threat detection.', 1299.99, 'Software', 'TWS-SEC-500', 30),
('Backup Tape LTO-9 (5-pack)', 'High-capacity LTO-9 backup tapes, 18TB native per cartridge.', 199.99, 'Hardware', 'BTL-9-005', 600),
('Kubernetes Cluster License', 'Managed K8s with auto-scaling, monitoring, and 99.9% SLA.', 799.99, 'Cloud Services', 'KCL-PRO-010', 200);