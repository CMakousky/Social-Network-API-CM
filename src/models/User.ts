import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: 
        {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
    email: 
        {
            type: String,
            unique: true,
            required: true,
            // Attempting to use Regular Expression to match the ending of the email address to a permutation of @*.com, @*.org, @*.net, or @*.gov
            match: /^\@*\.(?:com|org|net|gov)$/
        },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
  },
  {
    toJSON: 
      {
        virtuals: true,
      },
    id: false,
  }
);

// Return the length of the friends array on query.
userSchema.virtual('friendCount')
.get(function () {
  return `${this.friends.length}`
});

// Initialize the User model
const User = model('user', userSchema);

export default User;