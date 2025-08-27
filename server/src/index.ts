import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel, LinkModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { hash, z } from "zod";
import bcrypt from "bcrypt";
import { random } from "./utils.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(3).max(30),
    password: z
      .string()
      .min(3, "Password must be at least 3 characters long")
      .max(30, "Password cannot exceed 30 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.status(400).json({
      message: "Incorrect Format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const { username, password } = parsedDataWithSuccess.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  const existingUser = await UserModel.findOne({
    username,
  });

  const passwordMatch =
    existingUser && (await bcrypt.compare(password, existingUser.password));

  if (!existingUser || !passwordMatch) {
    return res.status(403).json({ message: "Incorrect credentials" });
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    JWT_PASSWORD
  );
  res.json({ token });
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { link, type, title } = req.body;

    if (!link || !type) {
      return res.status(400).json({ error: "Link and type are required" });
    }

    await ContentModel.create({
      link,
      type,
      title,
      userId: req.userId,
      tags: [],
    });

    return res.status(201).json({
      message: "Content Added",
    });
  } catch (e) {
    console.error("Error adding content: " + (e as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const content = await ContentModel.find({
      userId: userId,
    }).populate("userId", "username");

    res.json({ content });
  } catch (e) {
    console.error("Error fetching content: " + (e as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ error: "contentId missing" });
    }

    await ContentModel.deleteMany({
      _id: contentId,
      userId: req.userId,
    });
  } catch (e) {
    console.error("Couldn't delete: " + (e as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;

  try {
    if (share) {
      const hash = random(10);
      await LinkModel.create({
        userId: req.userId,
        hash,
      });
      return res.json({ message: "The link is /share/" + hash });
    } else {
      await LinkModel.deleteOne({ userId: req.userId });
      return res.json({ message: "Removed Link" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: (e as Error).message });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(404).json({
      message: "Incorrect link",
    });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(404).json({
      message: "User doesn't exist",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(3000);
