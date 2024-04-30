import User from "../models/User.js";

export const createUserService = (data) => User.create(data);
export const findUserService = (filter) => User.findOne(filter);
export const updateUserService = (filter, data) =>
  User.findOneAndUpdate(filter, data);
