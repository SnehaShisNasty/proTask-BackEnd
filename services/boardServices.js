import Board from "../models/Board.js";

const createBoardService = (data) => Board.create(data);
const editBoardService = (filter, data) =>

  Board.findOneAndUpdate(filter, data, {
    new: true,
    runValidators: true,
    projection: { createdAt: 0, updatedAt: 0 },
  });
	const getBoardByFilter = (filter) => {
	const result = Board.findById(filter);

	return result;
};
// Board.findById(filter).populate({
// 	path: "columns",
// 	select: "_id updatedAt title tasks",
// 	populate: {
// 		path: "tasks",
// 		select: {
// 			_id: 1,
// 			updatedAt: 1,
// 			title: 1,
// 			description: 1,
// 			priority: 1,
// 			deadline: 1,
// 		},
// 	},
// });
const getAllBoardsService = (filter = {}) =>
  Board.find(filter, "-createAt -updateAt").populate("owner", "name");

const deleteBoardService = (filter) => Board.findOneAndDelete(filter);

export default {
  createBoardService,
  editBoardService,
  getBoardByFilter,
  getAllBoardsService,
  deleteBoardService,
};
