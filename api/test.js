// Simple test endpoint
module.exports = function(req, res) {
    res.status(200).json({ message: 'Test endpoint working!', time: new Date().toISOString() });
};
