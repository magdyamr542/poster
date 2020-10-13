import mongoose = require("mongoose");

export const connectDB = async (dbName: string) => {
  // connect to mongodb
  const dbUrl = `mongodb://poster_db:27017/${dbName}`;
  mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  // connect to the db
  const db = mongoose.connection;
  db.on("error", () => console.log("Connection Error!!"));
  db.once("open", () => console.log("Mongodb is Up..."));
};
