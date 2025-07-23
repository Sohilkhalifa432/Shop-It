import userModel from "../models/userModel.js";
import { hashedPassword } from "../helpers/authHelper.js";
import { ComparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone, answer } = req.body;

    if (!name) {
      return res.send({ message: "name is required !" });
    }
    if (!email) {
      return res.send({ message: "name is required !" });
    }
    if (!phone) {
      return res.send({ message: "name is required !" });
    }
    if (!address) {
      return res.send({ message: "name is required !" });
    }
    if (!password) {
      return res.send({ message: "password is not found" });
    }
    if (!answer) {
      return res.send({ message: "password is not found" });
    }

    const userExistin = await userModel.findOne({ email });

    if (userExistin) {
      return res.status(200).send({
        success: false,
        message: "user already exist",
      });
    }

    const hashed = await hashedPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashed,
      address,
      phone,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
    console.log("Registration error:", error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }

    if (!password) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const match = await ComparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }

    // token validation

    // const token = await user.generateToken()
    const token = await JWT.sign({ _id: user._id }, process.env.jwt_secret, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
    console.log("Login error:", error);
  }
};

export const forgotPasswordController = async (req, res) => {
  const { email, answer, newPassword } = req.body;

  if (!email) {
    return res.status(404).send({
      success: false,
      message: "Email is Required",
    });
  }

  if (!answer) {
    return res.status(404).send({
      success: false,
      message: "Answer Is Required",
    });
  }
  if (!newPassword) {
    return res.status(404).send({
      success: false,
      message: "Password is Required",
    });
  }

  const user = await userModel.findOne({ email, answer });
  if (!user) {
    res.status(404).send({
      message: "Email and Answer is not found",
      success: false,
    });
  }

  const hash = await hashedPassword(newPassword);
  await userModel.findByIdAndUpdate(user._id, { password: hash });

  res.status(200).send({
    success: true,
    message: "Password Changed SuccessFully !",
  });
};

export const testController = (req, res) => {
  res.send("protected ");
};

// update profile controller

export const UpdateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.params._id);

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password is required",
      });
    }
    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "phone is required",
      });
    }
    if (!address) {
      return res.status(400).send({
        success: false,
        message: "address is required",
      });
    }

    const hashed = password ? await hashedPassword(password) : user.password;

    const userProfile = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashed || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "success fully updated profile",
      userProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile info...",
      error,
    });
  }
};
