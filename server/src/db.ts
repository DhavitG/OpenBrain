import mongoose, { model, Model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoUri = process.env.MONGO_URI as string;

mongoose.connect(mongoUri);

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);

const contentTypes = ["image", "video", "article", "audio"];

const ContentSchema = new Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tags" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const ContentModel = model("Content", ContentSchema);

const TagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

export const TagModel = model("Tags", TagSchema);

const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const LinkModel = model("Links", LinkSchema);
