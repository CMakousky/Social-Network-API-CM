import { Schema, model, Document } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
  username: string;
  thoughtText: string;
  createdAt: string;
  reactions: typeof Reaction[];
}

// Schema to create Thought model
const thoughtSchema = new Schema<IThought>(
  {
    username: 
        {
            type: String,
            required: true,
        },
    thoughtText: 
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
    createdAt: 
        {
            type: String,
            default: Date.toString,
        },
    reactions: [Reaction],
  },
  {
    toJSON: 
        {
            virtuals: true,
        },
    id: false,
  }
);

// Return the length of the reactions array on query.
thoughtSchema.virtual('reactionCount')
.get(function () {
  return `${this.reactions.length}`
});

// Initialize the User model
const Thought = model('thought', thoughtSchema);

export default Thought;