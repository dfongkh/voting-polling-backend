const mongoose = require("mongoose");

// Map global promises
mongoose.Promise = global.Promise;

// Connect Mongoose
mongoose
  .connect("mongodblink")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));
