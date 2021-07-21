const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'PNG', 'jpg', 'gif', 'jpeg'], folder = '') => {

    return new Promise((resolve, reject) => {
        //Get extension from file
        const{ file } = files;
        const trimmedName = file.name.split(".");
        const extension = trimmedName[trimmedName.length-1];
        
        //Validate extension
        if(!validExtensions.includes(extension)){
            return reject(`<Extension ${extension} is not valid, ${validExtensions}`);
        }
    
        //Upload file
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, tempName);
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve( tempName );
        });
    });
}

module.exports = {
    uploadFile
}