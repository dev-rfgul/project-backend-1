import mongoose, { Schema } from mongoose

const tweetSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        content: {
            type: String,
            req: true,
        }
    },
    { timeStamps: true, }
)


export const tweet = mongoose.model("Tweet", tweetSchema)
