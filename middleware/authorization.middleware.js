const { ForbiddenError } = require("../errors/customsErrors");

module.exports = {
  adminAccess: (req, res, next) => {
    try {
      const role = req.user.role;

      if (role !== "ADMIN") throw new ForbiddenError("Kamu tidak memiliki akses kesini");

      next();
    } catch (err) {
      next(err);
    }
  },
};
