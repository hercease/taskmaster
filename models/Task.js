import mongoose, { Schema, model } from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    deadline: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Link task to a user
  },
  { collection: 'tasks' } // Explicitly specify the collection name
);

export default model('Task', TaskSchema);
