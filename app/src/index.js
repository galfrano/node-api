import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import dbConnection from './service/dbConnection.js'
import usersCollection from './collections/users.js'
import userData from '../users.json' assert { type: 'json' };
import routes from './service/router.js'
dotenv.config()
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

let db = await dbConnection();
//process.exit();


/*
for(let u of userData){
  //console.log({userData, u})
  await users(u);
} 
*/
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "no entity selected" });
});

//require("./app/routes/turorial.routes")(app);
app.use(routes);
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
