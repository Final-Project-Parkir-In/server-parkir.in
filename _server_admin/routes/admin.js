const express = require("express");
const Controller = require("../controllers/adminController");
const router = express.Router();
const {validate} = require('express-validation');
const adminValidator = require("../middlewares/admin");

router.post("/",validate(adminValidator.createOrUpdateAdmin), Controller.createAdmin)
router.get("/", Controller.allAdmin)
router.get("/:id", Controller.detailAdmin)
router.delete("/:id", Controller.deleteAdmin)
router.patch("/:id",validate(adminValidator.createOrUpdateAdmin), Controller.updateAdmin)

// sandbox route
// router.post("/", Controller.sandbox)

module.exports = router;
