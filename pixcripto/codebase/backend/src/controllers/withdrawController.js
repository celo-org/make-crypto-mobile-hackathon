
import { WithdrawSchema } from "../schemas/withdrawSchema";
import User from "../models/User";
import Withdraw from "../models/Withdraw";
import { pix } from "../controllers/pixController";
import Transaction from "../models/Transaction";

export const withdraw = async (req, res) =>{

    try {
        await WithdrawSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    const user = getToken(req)

    const { address } = await User.findOne({ cpf: user.cpf }) // Unused Variable
    const { base } = await User.findOne({base: req.body.base })
    // TODO: Criar campos address e base para todo novo usuário criado
    // Cannot destructure property 'address' of '(intermediate value)' as it is null.
    const body = {
        message: 'Transaçao realizada com sucesso',
        address: req.body.address,
        cpf: req.body.cpf,
        base: base,
        date: Date.now()
    }


}