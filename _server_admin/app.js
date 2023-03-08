if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const { mongoConnect } = require("./configs/mongoConnection");
const { errorHandler } = require("./middlewares/errHandler");
const router = require("./routes/admin");
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/admin", router);

app.use(errorHandler);
// Jadi sekarang sebelum masuk ke routing di bawah,
// kita harus koneksi ke db kita terlebih dahulu
(async () => {
    try {
        await mongoConnect();
        app.listen(port, (_) => console.log(`Apps is listening at port ${port}`));
    } catch (err) {
        console.log(`Failed to connect to mongodb`);
    }
})();
module.exports = app
