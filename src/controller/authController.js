const bcrypt = require("bcryptjs");
const { AppError, catchAsync } = require("../utils/appError");
const { signJwtToken } = require("../utils/jwt");
const Models = require("../models/index");

exports.registerUser = catchAsync(async (req, res, next) => {
  const { email, password, name } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(
      new AppError(
        "Please provide a valid email address (e.g. user@example.com)",
        400
      )
    );
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    return next(
      new AppError(
        "Password must be at least 8 characters long and include at least one number and one special character",
        400
      )
    );
  }

  const userExists = await Models.UserModel.findOne({ where: { email } });
  if (userExists) {
    return next(new AppError("User already exists", 500));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Models.UserModel.create({
    email,
    password: hashedPassword,
    name,
  });

  const token = signJwtToken(newUser.id);

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    token,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Models.UserModel.findOne({ where: { email } });
  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  const token = signJwtToken(user.id);

  res.status(200).json({
    status: "success",
    message: "Login successful",
    token,
  });
});
