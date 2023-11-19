const isAuthenticated = (req, res, next) => {
  try {

    if (false)
      return res.status(401).json({ message: "Unauthorised" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorised", error });
  }
};

export default isAuthenticated;