import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // The question text
  description: { type: String }, // Optional field for additional details
  options: { type: [String], required: true }, // Array of options
  correctOption: { type: Number, required: true }, // Index of the correct option
});

const ContestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema], // Reference to the QuestionSchema
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Contest = mongoose.model("Contest", ContestSchema);

export default Contest;
