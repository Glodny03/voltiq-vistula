import User from "../models/user.model.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const PASSWORD_FIELD_EXCLUSION = "-password";

const buildUserSearchFilters = ({ username, email }) => {
  const filters = {};

  if (username) {
    filters.username = { $regex: username, $options: "i" };
  }

  if (email) {
    filters.email = { $regex: email, $options: "i" };
  }

  return filters;
};

const parsePaginationValue = (value, fallback) =>
  parseInt(value, 10) || fallback;

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("listings");

    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const filters = buildUserSearchFilters(req.query);
    const page = parsePaginationValue(req.query.page, DEFAULT_PAGE);
    const limit = parsePaginationValue(req.query.limit, DEFAULT_LIMIT);
    const skip = (page - 1) * limit;

    const usersCount = await User.countDocuments(filters);
    const users = await User.find(filters)
      .select(PASSWORD_FIELD_EXCLUSION)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      users,
      totalPages: Math.ceil(usersCount / limit),
      currentPage: page,
      totalUsers: usersCount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getUser, getAllUsers };
