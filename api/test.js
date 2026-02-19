// Simple test endpoint
module.exports = (req, res) => {
    res.json({ message: 'Test endpoint working!', time: new Date().toISOString() });
};
