const express = require("express");
const router = express.Router();
const codeController = require("../Controllers/Code");

//new code
router.post("/", codeController.newCode);

//get codes
router.get("/", codeController.getCode);

//get code by number
router.get("/:number", codeController.getCodeByNumber);

//update Code
router.put("/update-code/:id", codeController.updateCodeById);

module.exports = router;
