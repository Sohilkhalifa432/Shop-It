import express from "express";
import { requireSignin } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  allOrdersController,
  brainTreePaymentsController,
  brainTreeTokenController,
  OrderController,
  orderUpdateController,
  SearchController,
  SimilarProductController,
} from "../controller/ProductController.js";
import {
  CreateProductController,
  GetAllProducts,
  GetSingleProduct,
  UpdateProduct,
  DeleteProduct,
  GetPhoto,
} from "../controller/ProductController.js";
import formidable from "express-formidable";
const router = express.Router();

//  for creating router
router.post(
  "/Create-Product",
  requireSignin,
  isAdmin,
  formidable(),
  CreateProductController
);
// getting all the products
router.get("/Get-All-Products", requireSignin, GetAllProducts);

// getting one single ``product

router.get("/Get-Single-Product/:slug", requireSignin, GetSingleProduct);

// update the product
router.put("/Update-Product/:pid", requireSignin, isAdmin, UpdateProduct);

// DELETE THE PRODUCT
router.delete("/Delete-Product/:pid", requireSignin, isAdmin, DeleteProduct);
export default router;

// getting photo image for products

router.get("/product-photo/:id", GetPhoto);

router.get("/search/:keyword", SearchController);

// similar products
router.get("/similar-products/:pid/:cid", SimilarProductController);

// getting token with brain tree
router.get("/braintree/token", requireSignin, brainTreeTokenController);

// payments
router.post("/braintree/payment", requireSignin, brainTreePaymentsController);

router.get("/orders", requireSignin, OrderController);

// getting all orders

router.get("/all-orders", requireSignin, isAdmin, allOrdersController);

// getting update status with all orders in admin panel
router.put(
  "/put-order/:orderId",
  requireSignin,
  isAdmin,
  orderUpdateController
);
