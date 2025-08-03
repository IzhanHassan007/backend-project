import mongoose, {Schema, SchemaType} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// User ka schema define kar rahe hain
const userSchema = new Schema(
    {
        username:{                 // Username (unique, lowercase, trimmed)
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email:{                // Email (unique, lowercase, trimmed)
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{             // Full Name (search k liye index)
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar:{               // Profile image (Cloudinary URL)
            type: String,
            required: true,
        },
        coverImage:{           // Cover image (optional)
            type: String,
        },
        watchHistory:[         // Dekhe gaye videos ka record
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password:{             // User ka password (hashed save hoga)
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken:{         // JWT refresh token (re-login k liye)
            type: String,       
        }
    },
    {
        timestamps: true,      // CreatedAt & UpdatedAt auto generate
    }
);

// Save sy pehle password hash karo
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();   // Agar password change nahi to skip
    this.password = await bcrypt.hash(this.password, 10)    // Password ko 10 salt rounds k sath hash karo
    next() 
})

// Password check karne ka method (login k liye)
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)  // Entered vs DB hashed compare
}

// Access token generate karne ka method (short term login)
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}

// Refresh token generate karne ka method (long session)
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}

// Model ko export kar rahe hain
export const User = mongoose.model("User", userSchema);
