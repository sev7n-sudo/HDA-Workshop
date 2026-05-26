import type { NextApiRequest, NextApiResponse } from 'next';

const products = [
  { id: 1, name: 'CloudSync Pro License', category: 'Software', price: 299.99, sku: 'CSP-2024-001' },
  { id: 2, name: 'SecureVault USB Key', category: 'Hardware', price: 49.99, sku: 'SVK-HW-042' },
  { id: 3, name: 'DevOps Pipeline Toolkit', category: 'Software', price: 599.99, sku: 'DPT-ENT-100' },
  { id: 4, name: 'Network Probe Analyzer', category: 'Hardware', price: 149.99, sku: 'NPA-NET-007' },
  { id: 5, name: 'DataLake Storage (1TB)', category: 'Cloud Services', price: 89.99, sku: 'DLS-1TB-STD' },
  { id: 6, name: 'API Gateway Enterprise', category: 'Software', price: 449.99, sku: 'AGE-API-200' },
  { id: 7, name: 'Wireless Pentest Adapter', category: 'Hardware', price: 79.99, sku: 'WPA-SEC-013' },
  { id: 8, name: 'ThreatWatch SIEM', category: 'Software', price: 1299.99, sku: 'TWS-SEC-500' },
  { id: 9, name: 'Backup Tape LTO-9 (5-pack)', category: 'Hardware', price: 199.99, sku: 'BTL-9-005' },
  { id: 10, name: 'Kubernetes Cluster License', category: 'Cloud Services', price: 799.99, sku: 'KCL-PRO-010' },
];

const searchHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const q = (req.query.q as string) || '';

  if (!q) {
    return res.status(200).json({ results: products });
  }

  // VULNERABLE: directly using user input in regex without sanitization
  try {
    const regex = new RegExp(q, 'i');
    const results = products.filter(p => regex.test(p.name) || regex.test(p.category));
    res.status(200).json({ results });
  } catch (e) {
    res.status(200).json({ results: products, error: 'Invalid search pattern' });
  }
};

export default searchHandler;