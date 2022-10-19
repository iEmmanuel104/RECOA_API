const db = require('../../models');
const Unit = db.Unit;
const Property = db.Property;
const Op = require('sequelize').Op;

const addpropertyUnit = async (req, res) => {
    try {
        const { propertyId, name, description, price, count } = req.body;
        if (!propertyId) {
            throw new Error('Reference Property ID is required');
        }
        if (!name) {
            throw new Error('Name is required');
        }
        if (!description) {
            throw new Error('Description is required');
        }
        if (!price) {
            throw new Error('Price is required');
        }
        if (!count) {
            throw new Error('Count is required');
        }
        const UnitAlreadyExists = await Unit.findOne({
            where: { name: name },
        });
        if (UnitAlreadyExists) {
            throw new Error('Unit with the specified name already exists');
        }

        const property = await Property.findOne({
            where: { id: propertyId },
        });
        if (!property) {
            throw new Error('Property with the specified ID does not exists');
        }
        const unit = await Unit.create({
            propertyId,
            name,
            description,
            price,
            count,
        },
        );
        res.status(201).json({ unit });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAllpropertyUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findOne({
            where: { id: id },
        });
        if (!property) {
            throw new Error('Property with the specified ID does not exists');
        }
        const units = await Unit.findAll(
            {
                where: { propertyId: id },
            },
        );
        res.status(200).json({ msg: "All units for this property", units });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getpropertyUnitById = async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await Unit.findOne({
            where: { id: id },
        });
        if (unit) {
            return res.status(200).json({ unit });
        }
        res.status(404).send('Unit with the specified ID does not exists');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updatepropertyUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, count } = req.body;
        const unit = await Unit.findOne({
            where: { id: id },
        });
        if (!unit) {
            throw new Error('Unit with the specified ID does not exists');
        }
        const updatedUnit = await Unit.update(
            {
                name,
                description,
                price,
                count,
            },
            {
                where: { id: id },
            },
        );
        res.status(200).json({ msg: "Unit updated", updatedUnit });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deletepropertyUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await Unit.findOne({
            where: { id: id },
        });
        if (!unit) {
            throw new Error('Unit with the specified ID does not exists');
        }
        await Unit.destroy({
            where: { id: id },
        });
        res.status(200).json({ msg: "Unit deleted" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const searchpropertyUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.query;
        const property = await Property.findOne({
            where: { id: id },
        });
        if (!property) {
            throw new Error('Property with the specified ID does not exists');
        }
        const units = await Unit.findAll(
            {
                where: {
                    propertyId: id,
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
            },
        );
        res.status(200).json({ msg: "All units for this property", units });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    addpropertyUnit,
    getAllpropertyUnit,
    getpropertyUnitById,
    updatepropertyUnit,
    deletepropertyUnit,
    searchpropertyUnit,
}