import User from "../models/User.js";
import token from "../models/Token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Signup the user

export const signupUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    };
    const newUser = new User(user);
    // saving to the database
    await newUser.save();

    return res.status(200).json({ msg: "signup sucessfully" });
  } catch (error) {
    return res.status(500).json({ msg: "signup error" });
  }
};

// login the user

export const loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "username doesn't exist" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_KEY);

      const newToken = new token({ token: refreshToken });
      await newToken.save();

      return res
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          username: user.username,
        });
    } else {
      return res.status(400).json({ msg: "passsword doesn't match" });
    }
  } catch (error) {
    return res.status(500).json({msg: "Error while login the user"});
  }
};
