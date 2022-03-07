const User = require("src/models/user");

exports.fetchUsers = async (req, res, next) => {
  const users = await User.fetchAll().then((users) => users);

  res.status(200).json({
    users,
  });
};
