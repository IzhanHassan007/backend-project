import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Video ka schema define kar rahe hain
const videoSchema = new Schema(
    {
        videoFile: {               // Video file ka URL (Cloudinary)
            type: String, 
            required: true,
        },
        thumbnail:{                // Video ka thumbnail URL
            type: String, 
            required: true,
        },
        title:{                    // Video ka title
            type: String, 
            required: true,
        },
        description:{              // Video ka description
            type: String, 
            required: true,
        },
        duration:{                 // Video ka duration (seconds/minutes me)
            type: Number, 
            required: true,
        },
        views: {                   // Kitni dafa dekhi gayi (default 0)
            type: Number,
            default: 0,
        },
        isPublished:{              
            type: Boolean,
            default: true,
        },
        owner:{                    
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,          
    }
);

// Pagination plugin lagaya (aggregation k sath paging easy hogi)
videoSchema.plugin(mongooseAggregatePaginate)

// Model export kar rahe hain
export const Video = mongoose.model("Video", videoSchema)
