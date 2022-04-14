import type { NextApiRequest, NextApiResponse } from "next";
import model from "utils/model";
import mongoose from "mongoose";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(process.env.MONGODB_URI);
  const db = await model.find();
  return res.json(db);
};

export default get;
