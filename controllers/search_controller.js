
const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const {User, Category, Product} = require('../models');

const existingCollections = [
    "users",
    "categories",
    "products",
    "roles"
];

const searchUsers = async (words = '', res = response) => {
    const isMongoId = ObjectId.isValid(words); 
    if(isMongoId){
        const user = await User.findById(words);
        return res.json({
            results:  (user) ?  [user] : []
        });
    }

    const regex = new RegExp(words, 'i');

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: users
    });

}

const searchCategories = async (words = '', res = response) => {
    const isMongoId = ObjectId.isValid(words); 
    if(isMongoId){
        const category = await Category.findById(words);
        return res.json({
            results:  (category) ?  [category] : []
        });
    }

    const regex = new RegExp(words, 'i');

    const categories = await Category.find({name: regex, status: true});

    res.json({
        results: categories
    });

}


const searchProducts = async (words = '', res = response) => {
    const isMongoId = ObjectId.isValid(words); 
    if(isMongoId){
        const product = await Product.findById(words)
        .populate('category', 'name')
        .populate('user', 'name');
        return res.json({
            results:  (product) ?  [product] : []
        });
    }

    const regex = new RegExp(words, 'i');

    const products = await Product.find({name: regex, status: true})
    .populate('category', 'name')
    .populate('user', 'name');
    res.json({
        results: products
    });

}


const search = (req, res = response) => {
    const {collection, words} = req.params;

    if(!existingCollections.includes(collection)){
        return res.status(400).json({
            msg: `The existing collections are: ${existingCollections}`
        });
    }

    switch (collection){
        case "users":
            searchUsers(words, res);
        break;
        case "categories":
            searchCategories(words, res);
        break;
        case "products":
            searchProducts(words, res);
        break;
        case "roles":
        break;
        default: 
            res.status(500).json({
                msg: "Please send a collection"
            });
    }
}


module.exports = {
    search
}