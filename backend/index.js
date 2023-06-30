//database code
//mongodb+srv://induvashisth11:<password>@cluster0.jyttrpi.mongodb.net/?retryWrites=true&w=majority
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
//import * from "./.en"
import ReviewsDAO from "./dao/DAO.js";
//data access object

dotenv.config();
const MongoClient = mongodb.MongoClient;
const mongo_useranme = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
//console.log(mongo_useranme);
const uri = `mongodb+srv://${mongo_useranme}:${mongo_password}@cluster0.jyttrpi.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const port = 5000;

MongoClient.connect(uri, {
  maxPoolSize: 50, //max no of people that can be connected at one time
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
