import { Schema, model } from 'mongoose';

let classSchema = new Schema(
  {
    classname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    no_of_places: {
      type: Number,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    created_by_name: {
      type: String,
      required: true,
    },
    create_date: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'Classes',
    versionKey: false,
  },
);
export default model('class', classSchema);
