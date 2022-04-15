import type { NextApiRequest, NextApiResponse } from "next";
import model from "utils/model";
import dbConnect from "lib/mongodb";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  await dbConnect();
  // mongoose
  //   .connect(process.env.MONGODB_URI)
  //   .then(() => console.log("DBに接続完了！"))
  //   .catch((err) => console.log(err));
  await model.create(JSON.parse(req.body));
  // await model.insert(req.body);
  return res.json(await model.find());
};

export default create;
