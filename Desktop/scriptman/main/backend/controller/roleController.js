import Role from "../model/Role.js";

// create role
export const createRole = async (req, res) => {
    const { role_name } = req.body;

    try {
        const create = await Role.create({ role_name });
        res.status(200).json(create);
    } catch (error) {
        res.status(400).json({
            error: "hi write the role name ola sir dar inak",
        });
    }
};

// get all roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({});
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: "somthing wrong" });
    }
};

// get role
export const getRole = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findById(id);
        if (!role) {
            res.status(404).json({ message: "Not Found" });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(400).json({ error: "wrong" });
    }
};
