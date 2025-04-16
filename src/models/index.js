// const Models = require('')

const TaskModel = require("./taskModel");
const UserModel = require("./userModel");

UserModel.hasMany(TaskModel, { foreignKey: "user_id" });
TaskModel.belongsTo(UserModel, { foreignKey: "user_id" });

module.exports = {
  UserModel,
  TaskModel,
};
