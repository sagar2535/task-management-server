const { catchAsync, AppError } = require("../utils/appError");
const Model = require("../models/index");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const offset = page * limit;

  const users = await Model.UserModel.findAll({
    limit,
    offset,
    raw: true,
    attributes: { exclude: ["password", "role"] },
  });

  if (users.length === 0) {
    return next(new AppError("No Users Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: users,
    message: "Users fetched successfully",
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Model.UserModel.findByPk(id, {
    attributes: ["id", "email", "name"],
    raw: true,
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
    message: "User fetched successfully",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { email, name, role } = req.body;

  const user = await Model.UserModel.findByPk(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const updatedUser = await user.update({
    email,
    name,
    role,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
    message: "User updated successfully",
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("User not found", 404));
  }

  await Model.UserModel.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});
