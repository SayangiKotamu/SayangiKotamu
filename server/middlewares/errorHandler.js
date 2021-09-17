function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "EmailInCollection":
      res.status(400).json({ message: "Email is already registered" });
      break;
    case "WrongEmailPassword":
      res.status(401).json({ message: "Email / Password is wrong" });
      break;
    case "Invalid Login":
      res.status(401).json({ message: err.message });
      break;
    case "Invalid JWT":
      res.status(401).json({ message: err.message });
      break;

    case "Not Login":
      res.status(401).json({ message: err.message });
      break;
    case "TokenExpiredError":
      res.status(401).json({ message: err.message });
      break;
    case "Not Authorized":
      res.status(401).json({ message: err.message });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid access_token" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = errorHandler;
