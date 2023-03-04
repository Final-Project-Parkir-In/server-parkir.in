const express = require("express");
const Controller = require("../controllers/adminController");
const router = express.Router();

router.post("/", Controller.createAdmin)
// router.get("/", Controller.allAdmin)
// router.get("/:id", Controller.detailAdmin)
// router.delete("/:id", Controller.deleteAdmin)
// router.patch("/:id", Controller.updateAdmin)

module.exports = router;
