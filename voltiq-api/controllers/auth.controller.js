import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const DEFAULT_USER_ROLE = "user";
const ACCESS_TOKEN_COOKIE = "accesstoken";
const TOKEN_EXPIRATION_TIME = "7d";
const ACCESS_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const createUserPayload = (userData) => ({
  ...userData,
  role: DEFAULT_USER_ROLE,
});

const collectModelValidationErrors = (model) => {
  const validationResult = model.validateSync();

  if (!validationResult) {
    return {};
  }

  return Object.entries(validationResult.errors).reduce(
    (errors, [field, validationError]) => ({
      ...errors,
      [field]: validationError.message,
    }),
    {},
  );
};

const collectDuplicateUserErrors = async ({ email, username }) => {
  const errors = {};

  const existingEmailUser = await User.findOne({ email });
  if (existingEmailUser) {
    errors.email = "Ten email już istnieje";
  }

  const existingUsernameUser = await User.findOne({ username });
  if (existingUsernameUser) {
    errors.username = "Ta nazwa użytkownika już istnieje";
  }

  return errors;
};

const removePasswordFromUser = (user) => {
  const { password, ...safeUserData } = user._doc;

  return safeUserData;
};

const createAuthToken = (user) =>
  jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION_TIME,
  });

const register = async (req, res) => {
  try {
    const userPayload = createUserPayload(req.body);
    const user = new User(userPayload);

    const duplicateErrors = await collectDuplicateUserErrors(req.body);
    const validationErrors = collectModelValidationErrors(user);
    const errors = { ...duplicateErrors, ...validationErrors };

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    user.password = bcryptjs.hashSync(req.body.password, 10);

    const createdUser = await user.save();

    return res.status(201).json(removePasswordFromUser(createdUser));
  } catch (error) {
    console.log("Błąd rejestracji: ", error);

    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Nie znaleziono użytkownika" });
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Błędne dane logowania" });
    }

    const token = createAuthToken(user);
    const userData = removePasswordFromUser(user);

    userData.token = token;

    return res
      .cookie(ACCESS_TOKEN_COOKIE, token, {
        maxAge: ACCESS_TOKEN_MAX_AGE,
      })
      .status(200)
      .json(userData);
  } catch (error) {
    console.log("Błąd logowania: ", error);

    return res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res, next) => {
  try {
    return res
      .clearCookie(ACCESS_TOKEN_COOKIE)
      .status(200)
      .json({ message: "Użytkownik wylogowany!" });
  } catch (error) {
    return next(error);
  }
};

export { register, login, logout };
