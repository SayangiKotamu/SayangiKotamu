const Categories = require('../models/categories')

class categoriesController {
    static async showAll(req, res, next) {
        try {
            let data = await Categories.find()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
    static async addCategories(req, res, next) {
        const {name} = req.body
        try {
            if (name) {
                const slug = name.toLowerCase().replace(' ', '_')
                let newCategories = {
                    name,
                    slug,
                }
                let data = await Categories.create(newCategories)
                res.status(201).json({...newCategories, _id: data._id})
            } else {
                throw {name: 'nameRequired', message: 'Name is required'}
            }
        } catch (err) {
            if (!err.errors) {
                next(err)
            } else {
                const toArray = Object.values(err.errors)
                const errMessage = toArray.map((el) => {
                    return el.message
                })
                res.status(400).json({message: errMessage})
            }
        }
    }
    static async getById(req, res, next) {
        const {id} = req.params
        try {
            const foundCategory = await Categories.findOne({_id: id})
            if (foundCategory) {
                res.status(200).json(foundCategory)
            } else {
                next({
                    name: 'NotFound',
                    message: `categories with id ${id} not found`,
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async editCategories(req, res, next) {
        const {name} = req.body

        try {
            if (name) {
                const slug = name.toLowerCase().replace(' ', '_')
                let updateCategories = {
                    name,
                    slug,
                }
                let data = await Categories.findOneAndUpdate(
                    {_id: req.params.id},
                    {$set: updateCategories},
                    {new: true}
                )
                console.log(data)
                if (data) {
                    res.status(201).json(data)
                } else {
                    next({
                        name: 'NotFound',
                        message: 'Categories Not Found',
                    })
                }
            } else {
                throw {name: 'nameRequired', message: 'Name is required'}
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async deleteCategories(req, res, next) {
        try {
            let data = await Categories.findOneAndDelete({_id: req.params.id})
            if (data) {
                res.status(201).json(data)
            } else {
                next({
                    name: 'NotFound',
                    message: 'Categories Not Found',
                })
            }
        } catch (err) {
            next(err)
        }
    }
}
module.exports = categoriesController
