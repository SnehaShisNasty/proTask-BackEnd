import bcrypt from "bcrypt";
export const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
