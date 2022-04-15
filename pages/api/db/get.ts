import type { NextApiRequest, NextApiResponse } from "next";
import model from "utils/model";
import dbConnect from "lib/mongodb";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const db = await model.find();
  return res.json(db);
};

export default get;
