const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json(['Error', 'Access denied. Insufficient permissions.']);
        }
        next();
    };
};

module.exports = checkRole;
