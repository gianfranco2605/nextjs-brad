"use server";
import { getCollection } from "../lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

function isAlphaNumeric(x) {
  const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
  return alphaNumericRegex.test(x);
}

export const login = async function (prevState, formData) {
  const failObject = {
    success: false,
    message: "Invalid username / password",
  };
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof ourUser.username !== "string") ourUser.username = "";
  if (typeof ourUser.password !== "string") ourUser.password = "";

  const collection = await getCollection("users");
  const user = await collection.findOne({ username: ourUser.username });

  if (!user) {
    return failObject;
  }

  const matchOrNot = bcrypt.compareSync(ourUser.password, user.password);

  if (!matchOrNot) {
    return failObject;
  }

  const ourTokenValue = jwt.sign(
    {
      skyColor: "blue",
      userId: user._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    process.env.JWTSECRET
  );

  cookies().set("ourapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    sercure: true,
  });

  redirect("/");
};

export const logout = async function () {
  cookies().delete("ourapp");
  redirect("/");
};

export const register = async function (prevState, formData) {
  const errors = {};

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof ourUser.username !== "string") ourUser.username = "";
  if (typeof ourUser.password !== "string") ourUser.password = "";

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  if (!errors.username && ourUser.username.length === 0) {
    errors.username = "You must provide a username";
  }
  if (!errors.username && ourUser.username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }
  if (!errors.username && ourUser.username.length > 30) {
    errors.username = "Username must be no more than 30 characters long";
  }
  if (!errors.username && !isAlphaNumeric(ourUser.username)) {
    errors.username = "Just letters and numbers PLEASE";
  }

  if (!errors.password && ourUser.password.length === 0) {
    errors.password = "You must provide a password";
  }

  //see if our user exist
  const userCollection = await getCollection("users");
  const usernameInQuestion = await userCollection.findOne({
    username: ourUser.username,
  });

  if (usernameInQuestion) {
    errors.username = "That username is already in use ";
  }

  if (!errors.password && ourUser.password.length < 3) {
    errors.password = "Password must be at least 3 characters long";
  }
  if (!errors.password && ourUser.password.length > 30) {
    errors.password = "Password must be no more than 30 characters long";
  }

  // Return early if there are errors
  if (errors.username || errors.password) {
    return {
      errors,
      success: false,
    };
  }

  // hash password
  const salt = bcrypt.genSaltSync(10);

  ourUser.password = bcrypt.hashSync(ourUser.password, salt);

  const newUser = await userCollections.insertOne(ourUser);

  const userId = newUser.insertedId.toString();

  //Create JWT value
  const ourTokenValue = jwt.sign(
    {
      skyColor: "blue",
      userId: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    process.env.JWTSECRET
  );
  console.log(ourTokenValue);

  cookies().set("ourapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    sercure: true,
  });
  // Return success after MongoDB interaction
  return {
    success: true,
  };
};
