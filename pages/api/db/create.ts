import type { NextApiRequest, NextApiResponse } from "next";
import model from "utils/model";
import mongoose from "mongoose";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  mongoose.connect(process.env.MONGODB_URI);

  await model.create(JSON.parse(req.body));
  // await model.insert(req.body);
  return res.json(await model.find());
};

export default create;
