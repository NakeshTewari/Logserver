import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

console.log("PORT:", process.env.PORT);


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is running at port: http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed!", error);
  });

 