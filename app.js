if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorhandler");
const { mongoConnect } = require('./config/mongodb');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log('Server listening to the port', PORT);
// });

(async () => {
  try {
      await mongoConnect();
      app.listen(PORT, (_) => console.log(`Apps is listening at port ${PORT} and connect to mongoDB`));
  } catch (err) {
      console.log(`Failed to connect to mongodb`);
  }
})();

module.exports = app;