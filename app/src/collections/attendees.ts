import { Schema, model } from 'mongoose'

let attendees = new Schema(
    {
      class_id: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
    },
    {
        collection: "Attendees",
        versionKey: false
    }
);
export default model("attendee", attendees);
