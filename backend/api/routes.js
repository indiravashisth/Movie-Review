import express from "express";
import ReviewCtrl from "./controllers.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("hello world");
  console.log("inside route");
});
router.route("/movie/:id").get(ReviewCtrl.apiGetReviews);
router.route("/new").post(ReviewCtrl.apiPostReview);
router
  .route("/:id")
  .get(ReviewCtrl.apiGetReview)
  .post(ReviewCtrl.apiUpdateReview)
  .delete(ReviewCtrl.apiDeleteReview);

export default router;
