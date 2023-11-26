import user from "../model/user.model.js";
// import categories from "../model/categories.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const register = async (req, res) => {
  const { name, email, password, numberPhone, companyName } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedValue = bcrypt.hashSync(password, salt);

    const newUser = await user.create({
      name: name,
      email: email,
      password: hashedValue,
      numberPhone: numberPhone,
      companyName: companyName,
    });

    res.status(200).json({
      message: "New user created",
      data: { email: newUser.email },
    });
  } catch (error) {
    console.log(error);
    //   send res status 500 - server error
    res.status(500).json({ message: "Server error", error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // query user based on email
    const User = await user.findOne({
      where: {
        email: email,
      },
    });

    // No user return
    //   if user not found return 404
    if (!User) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    // compare hash
    const isMatch = await bcrypt.compare(password, User.password);

    // create access token
    const token = jwt.sign({ id: User.id }, process.env.JWT);

    // compare password from body with database
    if (isMatch) {
      res.status(200).json({ message: "User log in", data: { token: token } });
      return;
    } else {
      res.status(401).json({ message: "Credential Invalid" });
      return;
    }

  } catch (error) {
    console.log(error);
    //   send res status 500 - server error
    res.status(500).json({ message: "Server error", error: error });
  }
};

// const showUser = async (req, res) => {
//   const userId = req.userId;

//   try {
//     // query user based on name
//     const User = await user.findOne({
//       where: {
//         id: userId,
//       },
//     });

//     // No name return
//     //   if name not found return 404
//     if (!User) {
//       res.status(404).json({ message: "user not found" });
//       return;

//     }

//     else {

//       res.status(200).json({ message: "user found", data: { email: User.email } });
//       return;

//     }

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error });

//     console.log(">>>>");
//     console.log(error);
//   }
// };

// const updatePassword = async (req, res) => {
//   const { newPassword } = req.body;
//   const userId = req.userId;

//   try {

//     const salt = bcrypt.genSaltSync(10);
//     const hashedValue = bcrypt.hashSync(newPassword, salt);
//     // query user based on name
//     const User = await user.findOne({
//       where: {
//         id: userId,
//       },
//     });

//     // No name return
//     //   if name not found return 404
//     if (!User) {
//       res.status(404).json({ message: "User not found" });
//       return;

//     }

//     else {
//       // Change everyone without a last name to "Doe"
//       await User.update({ password: hashedValue });

//       res.status(200).json({ message: "password updated" });
//       return;

//     }

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error });
//     console.log(error);
//   }
// };


const publicController = (req, res) => {
  res.status(200).json({ message: "Public route" });
};

const protectedController = (req, res) => {
  res.status(200).json({ message: "Protected route", data: { user: req.user } });
};

const authController = { register, login, publicController, protectedController/*, showUser, updatePassword*/ };

export default authController;