import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    dateToStart: {
      type: String,
      required: true,
    },
    dateToFinish: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Compile the model if it hasn't been compiled yet
const TASKS = mongoose.models.tasks || mongoose.model('tasks', taskSchema);

export default TASKS;
