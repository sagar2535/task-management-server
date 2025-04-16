const { catchAsync, AppError } = require("../utils/appError");
const Model = require("../models/index");

exports.createTask = catchAsync(async (req, res, next) => {
  const user_id = req.user?.id;

  const { title, description, status, due_date } = req.body;

  if (!title || !due_date) {
    return next(new AppError("Title and due date are required fields.", 400));
  }

  const postData = {
    title,
    description,
    status: status || "pending",
    due_date,
    user_id,
  };

  const newTask = await Model.TaskModel.create(postData);

  res.status(201).json({
    status: "success",
    message: "Task created successfully.",
    data: newTask,
  });
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const offset = page * limit;

  const user_id = req.user?.id;
  const { status } = req.body;

  if (!user_id) {
    return next(new AppError("Invalid user. Please log in again.", 401));
  }

  const whereCondition = { user_id };
  if (status) whereCondition.status = status;

  const tasks = await Model.TaskModel.findAll({
    where: whereCondition,
    limit,
    offset,
    raw: true,
    order: [["due_date", "ASC"]],
  });

  res.status(200).json({
    status: "success",
    message: "Tasks fetched successfully.",
    data: tasks,
  });
});

exports.getTaskById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!id) {
    return next(new AppError("Task ID is required.", 400));
  }

  const task = await exports.getTaskFromUser(id, user_id);

  if (!task) {
    return next(new AppError("Task not found or access denied.", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Task fetched successfully.",
    data: task,
  });
});

exports.updateTaskById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!id) {
    return next(new AppError("Task ID is required for update.", 400));
  }

  const task = await exports.getTaskFromUser(id, user_id);

  if (!task) {
    return next(new AppError("Task not found or access denied.", 404));
  }

  const { title, description, status, due_date } = req.body;

  const updateData = { title, description, status, due_date };

  const [rowsUpdated] = await Model.TaskModel.update(updateData, {
    where: { id, user_id },
  });

  if (rowsUpdated === 0) {
    return next(new AppError("Task update failed. Try again later.", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Task updated successfully.",
  });
});

exports.deleteTaskById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!id) {
    return next(new AppError("Task ID is required for deletion.", 400));
  }

  const task = await exports.getTaskFromUser(id, user_id);

  if (!task) {
    return next(new AppError("Task not found or access denied.", 404));
  }

  await Model.TaskModel.destroy({ where: { id, user_id } });

  res.status(200).json({
    status: "success",
    message: "Task deleted successfully.",
  });
});

exports.getTaskFromUser = async (id, user_id) => {
  return await Model.TaskModel.findOne({
    where: { id, user_id },
    raw: true,
  });
};
