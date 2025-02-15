const cloudinary = require('cloudinary').v2;
const { log } = require('console');
const fs = require('fs');


cloudinary.config({ 
    cloud_name:  "dlbdfowtm", 
    api_key: "739166912142789", 
    api_secret: "mvv54hPy2iuKzEJ5DT2zmVFm13s" // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const res = await cloudinary.uploader.upload(localFilePath,{
                resource_type : "image"
            })
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(`Internal Error ${error}`)
    }
}

const uploadPDF = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const res = await cloudinary.uploader.upload(localFilePath,{
                resource_type : "image",
                folder: "certificates"
            })
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(`Internal Error ${error}`)
    }
}


module.exports = {uploadOnCloudinary , uploadPDF};
