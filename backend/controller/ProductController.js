import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";
import dotenv from "dotenv";
import braintree from "braintree";
import orderModel from "../models/OrderModel.js";

// making gateway with
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_MERCHANT_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_MERCHANT_PRIVATE_KEY,
});

// creating product model

export const CreateProductController = async (req, res) => {
  try {
    const { categorey, name, description, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.send({
          message: "name is required",
        });
      case !description:
        return res.send({
          message: "description  is required",
        });

      case !price:
        return res.send({
          message: "price is required",
        });
      case !quantity:
        return res.send({
          message: "quantity is required",
        });
      case !shipping:
        return res.send({
          message: "shipping is required",
        });
      case !categorey:
        return res.send({
          message: "categorey is required",
        });
    }

    const product = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product Created Successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Unable to Create product",
      error,
    });
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    console.log(products);
    if (products) {
      res.status(200).send({
        success: true,
        message: "Success Gotted All The Products",
        products,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Getting all the products",
      error,
    });
  }
};

// getting one single product

export const GetSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug });

    res.status(200).send({
      success: true,
      message: "success Gotted One Single Product !",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Error while getting single product",
      error,
    });
  }
};

// updating the product

export const UpdateProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await ProductModel.findByIdAndUpdate(
      pid, // <-- This must be a string, not { pid }
      req.body, // <-- This is the updated data

      { new: true, runValidators: true }
    );
    console.log(req.body);
    console.log(product);
    if (product) {
      res.status(200).send({
        success: true,
        message: "Product Updated SucessFully!",
        product,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating products",
      error,
    });
  }
};

// deleting product

export const DeleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    await ProductModel.findByIdAndDelete(pid);

    res.status(200).send({
      success: true,
      message: "product deleted successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting products",
      error,
    });
  }
};

// getting single photo

// getting single photo
export const GetPhoto = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).select("photo");

    if (product && product.photo && product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data); // send image directly
    } else {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

export const SearchController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive name match
        { description: { $regex: keyword, $options: "i" } }, // Case-insensitive description match
      ],
    }).select("-photo");

    res.status(200).send({
      success: true,
      products: results,
    });
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).send({
      success: false,
      message: "Error in product search",
      error,
    });
  }
};

export const SimilarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const data = await ProductModel.find({
      categorey: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(4)
      .populate("categorey");
    res.status(200).send({
      success: true,
      message: "Gotted All Similar Products",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "error while getting similar products",
      error,
    });
  }
};

// payment gateway api
export const brainTreeTokenController = (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "error getting token",
          err,
        });
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const brainTreePaymentsController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;

    let total = 0;
    cart.forEach((i) => {
      total += i.price * (i.quantity || 1);
    });

    gateway.transaction.sale(
      {
        amount: total, // Spelling sahi karo
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (result && result.success) {
          const products = cart.map((item) => item._id); // Sirf product ki id bhejo
          await new orderModel({
            products,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send({
            success: false,
            message: "Payment failed",
            error: error || (result && result.message),
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while processing payment",
      error,
    });
  }
};

export const OrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate({
        path: "products",
        select: "-photo", // Product model में photo field है तो
      })
      .populate("buyer", "name address");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while getting orders!",
      error: error.message,
    });
  }
};

export const allOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate({
        path: "products",
        select: "-photo",
      })
      .populate("buyer", "name address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting all the orders",
      error,
    });
  }
};

export const orderUpdateController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const Updateorder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "updated status",
      Updateorder,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while status in order",
      error,
    });
  }
};
