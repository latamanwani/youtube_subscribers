const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const data = require("./data");
require("dotenv").config();

mongoose.set("strictQuery", true);
// Connect to database
const dbUrl =  "mongodb+srv://latamanwani:Znmd%4012345@subscribers.v1keo1i.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl, {
    dbName: 'subscribers',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

// Refresh data in subscribers collection
async function refreshData() {
  try {
    await Subscriber.deleteMany({}, { wtimeout: 30000 });

    console.log("Deleted all subscribers");
    const newSubscribers = await Subscriber.insertMany(data);
    console.log(`Added ${newSubscribers.length} new subscribers`);
  } catch (err) {
    console.log("Error refreshing data", err);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

refreshData();
