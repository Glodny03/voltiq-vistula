import mongoose from "mongoose";

const handleSuccessfulConnection = () => {
  console.log("Connected to MongoDB.");
};

const handleConnectionError = (error) => {
  console.log(error);
};

const connectMongoDB = (connectionUrl) => {
  mongoose
    .connect(connectionUrl)
    .then(handleSuccessfulConnection)
    .catch(handleConnectionError);
};

export default connectMongoDB;
