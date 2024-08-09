const prisma = require("../config/prisma");
const { UnauthorizedError } = require("../errors/customsErrors");
const AUTH_SERVICES = require("../services/auth.services");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth.utils");
const { JWT_SECRET_KEY, JWT_REFRESH_SECRET } = process.env;

postRegister = async (req, res, next) => {
  try {
    const result = await AUTH_SERVICES.register(req.body);
    res.status(200).json({
      success: true,
      message: "Successfully get regis",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Harap isi semua kolom");

    let foundUser = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!foundUser) throw new UnauthorizedError("Email / password salah");

    //checks if password correct
    const comparePassword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, foundUser.password, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });

    delete foundUser.password;

    if (!comparePassword) throw new UnauthorizedError("Email / password salah");

    const accesToken = await signToken("access", foundUser, JWT_SECRET_KEY);
    const refreshToken = await signToken("refresh", foundUser, JWT_REFRESH_SECRET);

    res
      .cookie("accesToken", accesToken, { httpOnly: true, maxAge: 3600000000 * 24 * 7, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 3600000000 * 24 * 7, secure: true })
      .status(200)
      .json({
        success: true,
        message: "Berhasil login",
        data: foundUser,
        accessToken: accesToken,
        refreshToken: refreshToken,
      });
  } catch (err) {
    next(err);
  }
};

whoami = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Whoami",
    error: null,
    data: { user: req.user },
  });
};

LoginWithGoogle = async (req, res, next) => {
  try {
    console.log(req.user);
    res.redirect("/");
  } catch (error) {
    next(err);
  }
};

module.exports = {
  postRegister,
  login,
  whoami,
  LoginWithGoogle,
};
