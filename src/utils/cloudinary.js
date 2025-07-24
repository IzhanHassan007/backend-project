// Cloudinary library ko import kr rhy hen (v2 version)
import { v2 as cloudinary } from "cloudinary"

// File system module import kr rhy hen (local files ko delete ya handle krny k liye)
import fs from "fs" 

// Cloudinary ka config set kr rhy hen (ye keys .env file me hoti hen)
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,  // Cloudinary ka account name
    api_key: process.env.CLOUDINARY_API_KEY,         // Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET    // Cloudinary secret key
});

// Ye function file ko Cloudinary pr upload krny k liye h
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Agar file path nahi mila to null return kro
        if (!localFilePath) return null

        // File ko Cloudinary pr upload krna
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"  // auto detect karega (image, video, etc.)
        })

        // Agar successfully upload hogyi to response.url print kro
        console.log("File is uploaded on Cloudinary ", response.url);
        return response;

    } catch (error) {
        // Agar error aaya to local system me jo temp file thi wo delete kr do
        fs.unlinkSync(localFilePath) 
        return null; // aur null return kr do
    }
}

// Function ko export kr rhy hen taki isay dusre files me use kr saken
export { uploadOnCloudinary }
