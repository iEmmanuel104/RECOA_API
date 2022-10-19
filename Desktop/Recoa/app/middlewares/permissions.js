const jwt = require("jsonwebtoken");
module.exports  = function (roles) {
    return function (req, res, next) {
        const allowed_user = roles.split(" ");
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKENJWT_SECRET);
            if (!allowed_user.includes(decoded.user_type)) {
                return res.status(403).json({ message: "Unauthorised Access" });
            }
            next();
        } catch (error) {
            res.status(400).json({ message: "Invalid token" });
        }
    };
};