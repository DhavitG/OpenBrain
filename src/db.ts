import mongoose, { model, Model, Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://dhavitg:ZRFpS2dtZt!GSDV@cluster0.rhpde.mongodb.net/OpenBrain"
);

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const ContentModel = model("Content", ContentSchema);
