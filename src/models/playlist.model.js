import mongoose, { Schema } from mongoose

const playlistSchema = new Schema({
    name: {
        type: String,
        req: true
    },
    description: {
        type: string,
        req: true,
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const playlist = mongoose.model("Playlist", playlistSchema)