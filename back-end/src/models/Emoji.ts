import { model, Schema } from "mongoose";

const emojiSchema = new Schema({
	char: {
		type: String,
		required: true,
	},
});

const Emoji = model("Emoji", emojiSchema);

export default Emoji;
