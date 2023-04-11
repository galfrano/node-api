import { Schema, model } from 'mongoose'

let user = new Schema(
    {
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    },
    {
        collection: "Users",
        versionKey: false
    }
);
export default model("user", user);
