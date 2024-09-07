import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
  name: string;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
