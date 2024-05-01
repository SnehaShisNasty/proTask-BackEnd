import Board from "../models/Board.js";

const createBoardService = (data) => Board.create(data);

export default {
	createBoardService,
};
