import mongoose from "mongoose";
const {
    MONGODB_USER: U,
    MONGODB_PASSWORD: W,
    MONGODB_HOST: H,
    MONGODB_DOCKER_PORT: P,
    MONGODB_DATABASE: D,
} = process.env;

const url = `mongodb://${U}:${W}@${H}:${P}/${D}?authSource=admin`
console.log(url)
export default async function dbConnection(){
    try {
      await mongoose.connect(url);
      console.log('MongoDB connected!!')
      return mongoose;
    } catch (err) {
      console.log('Failed to connect to MongoDB', err)
      return null
    }
}
