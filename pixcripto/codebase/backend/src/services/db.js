import mongoose from "mongoose";
import { env } from "../env";

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const _db = mongoose.connection;

async function connect() {
  if (_db.readyState === 2 || _db.readyState === 3) _db;

  _db.on("connecting", function () {
    console.log("connecting to MongoDB...");
  });

  _db.on("error", function (error) {
    console.error("Error in MongoDb connection: ", error);
    mongoose.disconnect();
  });

  _db.on("connected", function () {
    console.log("MongoDB connected!");
  });

  _db.once("open", function () {
    console.log("MongoDB connection opened!");
  });

  _db.on("reconnected", function () {
    console.log("MongoDB reconnected!");
  });

  _db.on("disconnected", async function () {
    console.log("MongoDB disconnected!");
    //await mongoose.connect(env.MONGO_URL, mongoConfig);
  });

  await mongoose.connect(env.MONGO_URL, mongoConfig)

  return _db;
}

const connect1 =  async ()=>{

  try{
      const conn = await mongoose.connect(process.env.MONGO_URL,{
          //must add in order to not get any error masseges:
          useUnifiedTopology:true,
          useNewUrlParser: true
         
      })
      console.log(`mongo database is connected!!! ${conn.connection.host} `)
  }catch(error){
      console.error(`Error: ${error} `)
      process.exit(1) //passing 1 - will exit the proccess with error
  }

}

connect1();

function getConnection() {
  return _db;
}

export { connect1, getConnection };
