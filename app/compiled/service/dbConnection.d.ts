import mongoose from "mongoose";
export default function dbConnection(): Promise<typeof mongoose>;
