import bcrypt from "bcrypt";

export const hashedPassword = async (password) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "password doesnot hashed",
    });
  }
};

export const ComparePassword = async (password, hashedPassword) => {
  try {
    const hashPassword = await bcrypt.compare(password, hashedPassword);
    return hashPassword;
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "password doesnot compare",
    });
  }
};
