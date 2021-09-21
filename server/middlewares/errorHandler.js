function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "EmailInCollection":
      res.status(400).json({ message: "Email is already registered" });
      break;
    case "WrongEmailPassword":
      res.status(401).json({ message: "Email / Password is wrong" });
      break;
    case "IdNotVerified":
      res.status(401).json({ message: "Id is not verified" });
      break;
    case "NoAccessToken":
      res.status(401).json({ message: "You do not have aceess token" });
      break;
    case "ReportNotFound":
      res.status(404).json({ message: "Report not found" });
      break;
    case "AnnouncmentNotFound":
      res.status(404).json({ message: "Announcement not found" });
      break;
    case "CastError":
      res.status(400).json({ message: "This field should be included" });
      break;
    case "IsActiveTrue":
      res.status(400).json({ message: "You have already activate your email" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid access token" });
      break;
    case "NoAccessReport":
      res.status(401).json({ message: "You have no access to this report" });
      break;
    case "ActivateAccount":
      res.status(401).json({
        message: "Please check your email and activate your account first.",
      });
      break;
    case "EmailTokenInvalid":
      res.status(401).json({
        message: "Email token is invalid",
      });
      break;
    case "NIKInCollection":
      res.status(400).json({ message: "NIK is already registered" });
      break;
    case "EmailCollection":
      res.status(400).json({ message: err.message });
      break;
    case "userRequired":
      res.status(400).json({ message: err.message });
      break;
    case "NotFound":
      res.status(404).json({ message: err.message });
      break;
    case "duplicateRating":
      res.status(400).json({ message: "You have already rate this report" });
      break;
    case "EmailError":
      res.status(400).json({ message: "Error sent email" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = errorHandler;
