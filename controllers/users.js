const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = process.env;
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ExistingError = require("../errors/existing-err");
const AuthError = require("../errors/auth-err");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return next(
          new NotFoundError("There was a problem finding the requested users")
        );
      }
      res.send(users);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .orFail(() => {
      return next(
        new BadRequestError("There was a problem finding the requested user")
      );
    })
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError("There was a problem retreiving the requested user")
        );
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.patchCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      name,
      avatar,
    },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      return next(
        new BadRequestError("There was a problem updating the requested user")
      );
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      return next(
        new ExistingError("There is already a user existing with this email")
      );
    }
    return bcrypt.hash(password, 10).then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
        .then((newUser) =>
          {if (!newUser) {
            return next(new BadRequestError("There was an error creating the new User"))
          }
          return res.send({
            name: newUser.name,
            email: newUser.email,
          })}
        )
        .catch(next)
    );
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return next(new AuthError("Wrong username or password"));
      }
      return res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch(next);
};

module.exports.patchPreferences = (req, res, next) => {
  const { preferences } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { preferences },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      return next(
        new BadRequestError("There was an error patching the user preferences")
      );
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.patchInfo = (req, res, next) => {
  const { name, avatar, email } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar, email },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      return next(
        new BadRequestError("There was an error patching the user info")
      );
    })
    .then((user) => res.send(user))
    .catch(next);
};
