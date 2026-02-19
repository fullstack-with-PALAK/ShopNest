// Simple test endpoint
export default function handler(req, res) {
    res.json({ message: 'Test endpoint working!', time: new Date().toISOString() });
}
