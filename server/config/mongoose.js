const mongoose = require("mongoose");

let url
if (process.env.NODE_ENV === "development") {
  url = "mongodb://localhost:27017/SayangiKotamu"
} else {
  url = "mongodb://localhost:27017/SayangiKotamu-test"
}

mongoose.connect(url,(err)=>{
  if (err) {
    console.log(err,"connect error");
  } else {
    console.log("connect success");
  }
})