import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  avatar: string;
  settingsId: Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, unique: true, required: true, index: true },
  username: { type: String, unique: true, required: true, min: 3, max: 25 },
  email: { type: String, unique: true, required: true, min: 5, max: 50 },
  avatar: { type: String, required: true, min: 1, max: 512 },
  settingsId: { type: Schema.Types.ObjectId, ref: "UserSettings", required: true, index: true },
});

export const User = models.User || model("User", userSchema);
