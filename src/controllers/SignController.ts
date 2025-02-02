import * as SignService from "../service/SignService";

export const getAll = async (req, res) => {
    let signs = await SignService.getAll();
    return res.send(signs);
}

export const change = async (req, res) => {
    await SignService.change(req.body);
    return res.send("Знак успешно изменен!");
};