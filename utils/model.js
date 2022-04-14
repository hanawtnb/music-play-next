import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mySchema = new Schema({
  searchStr: String,
  videoId: String,
});

mongoose.models = {};

var Song = mongoose.model("Song", mySchema);

export default Song;
