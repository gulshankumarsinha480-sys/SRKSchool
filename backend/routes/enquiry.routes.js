const express        = require("express");
const router         = express.Router();
const controller     = require("../controllers/enquiry.controller");
const authMiddleware = require("../middleware/auth.middleware");

// PUBLIC — form submission (no auth needed)
router.post("/", controller.create);

// PROTECTED — admin only
router.get("/stats/summary", authMiddleware, controller.getSummary);
router.get("/",              authMiddleware, controller.getAll);
router.get("/:id",           authMiddleware, controller.getOne);
router.patch("/:id",         authMiddleware, controller.updateStatus);
router.delete("/:id",        authMiddleware, controller.remove);

module.exports = router;
