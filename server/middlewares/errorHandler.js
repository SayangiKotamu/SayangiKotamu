function errorHandler(err, req, res, next) {
  console.log(err.name);
  switch (err.name) {
    case "EmailInCollection":
      res.status(400).json({ message: "Email is already registered" });
      break;
    case "WrongEmailPassword":
      res.status(401).json({ message: "Email / Password is wrong" });
      break;
    case "IdNotVerified":
      res.status(401).json({ message: "Id is not in the collection" });
      break;
    case "NoAccessToken":
      res.status(401).json({ message: "You do not have aceess token" });
      break;
    // ! HANDI ANGGA COBA INI BUAT APA
    // case "Invalid Login":
    case "NIKInCollection":
      res.status(400).json({ message: "NIK is already registered" });
      break;
    case "EmailCollection":
      res.status(400).json({ message: err.message });
      break;
    case "userRequired":
      res.status(400).json({ message: err.message });
      break;
    case "invalidLogin":
      res.status(401).json({ message: err.message });
      break;
    case "NotFound":
      res.status(401).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = errorHandler;
