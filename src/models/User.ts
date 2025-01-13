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
            // Using regular expression from https://regex101.com/r/lHs2R3/1 to check for any combination of words separated by '-' or '.' on the left side of the '@' character
            // with at least two instances of any combination of words and '-' separated by '.' on the right side of the '@' character.
            // This should accept only entries that are of a pattern such as 
            // apple.orange.banana@hotmail.com, or apple-orange-banana@custom.mailbox.org, or apple-orange.banana@internet.net
            match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
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