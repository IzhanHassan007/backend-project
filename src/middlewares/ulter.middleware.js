// Multer import kar rhy hen (file uploads handle krne ke liye)
import multer from "multer";

// Storage configuration define karte hen (kahan aur kis naam se file save hogi)
const storage = multer.diskStorage({
  
  // 'destination' define karta h ke uploaded file kis folder me save hogi
  destination: function (req, file, cb) {
    cb(null, "./public/temp") // './public/temp' folder me file save hogi
  },

  // 'filename' define karta h ke uploaded file ka naam kya hoga
  filename: function (req, file, cb) {     
    cb(null, file.originalname) // file ka original naam hi save hoga
  }
})

// Multer instance export kr rhe hen (is storage config ke sath)
export const upload = multer({
     storage,  // upar define kia hua storage use hoga
})
