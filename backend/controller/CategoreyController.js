import CategoreyModel from "../models/CategoreyModel.js";
import slugify from "slugify";
import productModel from "../models/ProductModel.js";

export const CreateCategoreyController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(404).send({
        success: false,
        message: "Name Is Required",
      });
    }

    const ExistingName = await CategoreyModel.findOne({ name });
    if (ExistingName) {
      return res.status(404).send({
        success: false,
        message: "Name is Already Exists",
      });
    }

    const Categorey = await CategoreyModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(200).send({
      success: true,
      message: "categorey created successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating categorey",
      error,
    });
  }
};

export const UpdateCategorey = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const categoery = await CategoreyModel.findOneAndUpdate(
      { _id: id },
      { name: name, slug: slugify(name) },

      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Categorey Updated Successfully",
      categoery: categoery,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Categorey cannot be updated",
      error,
    });
  }
};
export const ReadAllCategorey = async (req, res) => {
  try {
    const categorey = await CategoreyModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories Retrieved",
      categorey,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred while retrieving categories",
      error: error.message,
    });
  }
};

// deleting categorey functionality

export const DeleteCategorey = async (req, res) => {
  try {
    const { id } = req.params;

    const categorey = await CategoreyModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      message: "Deleted Successfully !",
      categorey,
    });
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      message: "unable to delete the categorey",
      error,
    });
  }
};

export const categoeryFilter = async (req, res) => {
  try {
    const { checked } = req.body;

    let args = {};
    if (checked.length > 0) {
      args.categorey = checked;
    }
    const product = await productModel.find({ ...args });

    res.status(200).send({
      success: true,
      message: "gotted all",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while filtering categorey",
    });
  }
};
