import User from "../models/User"
import { getToken } from "./authChecker";

export const getUser = async (req, res) => {
    const userToken = getToken(req)

    try {
        const userfromDB = await User.findOne({ email: userToken.email })
        const userToReturn = {
            name: userfromDB.name,
            cpf: userfromDB.cpf,
            email: userfromDB.email,
        }
        return res.status(200).json(userToReturn)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}