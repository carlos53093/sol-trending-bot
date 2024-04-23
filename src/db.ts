import { config } from "dotenv";
import mongoose from "mongoose";
config();

if (process.env.DB_URI) {
    mongoose.connect(process.env.DB_URI, {dbName: "OlafBot",}).then(() => {
        console.log("DB Connected");
    }).catch(err => {
        console.log(err)
    })
} else {
    console.log("DB_URI is not defined. Add it to .env");
}

const SwapAmountsSchema = new mongoose.Schema({
    swapInAmountTokenA: String,
    swapOutAmountTokenB: String,
});

export const SwapAmounts = mongoose.model("swapAmounts", SwapAmountsSchema);

const UserSchema = new mongoose.Schema({
    userId: Number,
    wallet: String,
});

export const User = mongoose.model("users", UserSchema);