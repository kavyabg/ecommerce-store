import { User } from "../../models/userModel.js";

export const userList = async (req, res) =>{
    const users = await User.find();
    res.json(users);
}