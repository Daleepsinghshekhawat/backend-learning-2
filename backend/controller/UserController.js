const UserModel = require("../model/userModel.js");
const SignupModel = require("../model/signupModel");
const taskmodel = require('../model/taskModel');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "mysecretkey";

// exports.signup = async (req, res) => {

//   console.log(">>>>>>>.", req.body);
//   const savedData = new UserModel(req.body);
//   const result = await savedData.save();
//   res.status(200).json(result);
// }

// exports.signup = async (req, res) => {
//   try {
//     const user = await UserModel.create(req.body);

//     res.status(201).json({
//       user
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingdata = await SignupModel.findOne({ email });

    if (existingdata) {
      return res.status(409).json({
        message: "email already exist",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await SignupModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Signup Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(404).json({
        message: "all field are required",
      });
    }

    const existingdata = await SignupModel.findOne({ email });

    console.log(existingdata);

    if (!existingdata) {
      return res.status(404).json({
        message: "sign up first",
      });
    }

    const match = await bcrypt.compare(password, existingdata.password);

    if (match) {
      const token = jwt.sign({ email }, secretkey);

      return res.status(200).json({
        message: "sucesfully",
        token,
      });
    } else {
      return res.status(401).json({
        message: "login password incoreect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// post user
exports.createUser = async (req, res) => {
  try {
    const result = await UserModel.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get user
exports.getUsers = async (req, res) => {
  try {
    const result = await UserModel.find();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get single user by id
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await UserModel.findById(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "No id found",
      });
    }

    const result = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "User Updated",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//  deleted user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await UserModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//soft delete
exports.softDeleteUser = async (req, res) => {
  try {
    const result = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "deleted",
      },
      { new: true },
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// to get inactive users
exports.getDeletedUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      status: "deleted",
    });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//restore
exports.restoreUser = async (req, res) => {
  try {
    const result = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "active",
      },
      { new: true },
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// password froget

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }
    const user = await SignupModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const saltrounds = 10;
    const salt = bcrypt.genSaltSync(saltrounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// reset password

exports.resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!(email && oldPassword && newPassword)) {
      return res.status(400).json({
        message: "all field are required",
      });
    }

    const user = await SignupModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(401).json({
        message: "old password is wrong",
      });
    }

    const samePassword = await bcrypt.compare(newPassword, user.password);

    if (samePassword) {
      return res.status(400).json({
        message: "new password cannot be same as old password",
      });
    }

    const saltrounds = 10;
    const salt = bcrypt.genSaltSync(saltrounds);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


exports.addTask 

