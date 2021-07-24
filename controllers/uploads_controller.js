const { response } = require('express');
const { uploadFile } = require('../helpers');
const {User, Product} = require('../models');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const loadFile = async (req, res = response) => {

    try{
        // const name = await uploadFile(req.files, ['txt', 'md']);
        const name = await uploadFile(req.files, undefined, 'imgs');
        res.json({ name });
    }catch(msg){
        res.status(400).json({msg})
    }
}

const updateImage = async (req, res = response) =>{


    const{id, collection} = req.params;
    let model;
    switch(collection){
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({msg: 'User does not exist'});
            }

        break;
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({msg: 'Product does not exist'});
            }
        break;
        default:
            return res.status(500).json({msg: 'forgot to validate this'});
    }

    //Clean old images
    if(model.image){
        const pathImage = path.join( __dirname, '../uploads', collection, model.image);
        if(fs.existsSync(pathImage)){
            fs.unlinkSync(pathImage);
        }
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.image = name;
    await model.save();
    res.json(model);
}


const updateImageCloudinary = async (req, res = response) =>{


    const{id, collection} = req.params;
    let model;
    switch(collection){
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({msg: 'User does not exist'});
            }

        break;
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({msg: 'Product does not exist'});
            }
        break;
        default:
            return res.status(500).json({msg: 'forgot to validate this'});
    }

    //Clean old images
    if(model.image){
       const nameArray = model.image.split('/');
       const imageName = nameArray[nameArray.length-1];
       const [ public_id ] = imageName.split('.');
       cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.image = secure_url;
    await model.save();
    res.json(model);
}

const showImage = async (req, res= response) => {
    const{id, collection} = req.params;
    let model;
    switch(collection){
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({msg: 'User does not exist'});
            }

        break;
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({msg: 'Product does not exist'});
            }
        break;
        default:
            return res.status(500).json({msg: 'forgot to validate this'});
    }

    //Clean old images
    if(model.image){
        const pathImage = path.join( __dirname, '../uploads', collection, model.image);
        if(fs.existsSync(pathImage)){
            return res.sendFile(pathImage);
        }
    }
    const emptyImagePath = path.join(__dirname, '../assets/no-image.jpg' ); 
    res.sendFile(emptyImagePath);
}


module.exports = {
    loadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}