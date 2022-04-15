const { roles } = require("src/roles");
const User = require("src/models/user");

exports.fetchUsers = async (req, res, next) => {
  try {
    const users = await User.fetchAll().then((users) => users);

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await new User({ id: userId }).fetch().then((user) => user);

    if (!user) return next(new Error("User does not exist"));

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
