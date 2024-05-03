import Board from "../models/Board.js";

const createBoardService = (data) => Board.create(data);
const editBoardService = (filter, data) =>
  Board.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
    projection: { createdAt: 0, updatedAt: 0 },
  });
const getAllBoardsService = (filter = {}) =>
  Board.find(filter, "-createAt -updateAt").populate("owner", "name");
const deleteBoardService = (filter) => Board.findOneAndDelete(filter);

export default {
  createBoardService,
  editBoardService,
  getAllBoardsService,
  deleteBoardService,
};
