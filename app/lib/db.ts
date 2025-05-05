import mongoose from 'mongoose'

const MONGO_URI = 'mongodb+srv://samuelrosero:hyiC74r6doPcXI5f@cluster0.00992hh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGO_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error)
    }
}