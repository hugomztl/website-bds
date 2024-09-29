import express from "express";
import Emoji from "../models/Emoji";

const router = express.Router();

type EmojiResponse = string[];

router.get<{}, EmojiResponse>("/", async (req, res) => {
	const emojis = (await Emoji.find().lean().exec()).map((emoji) => emoji.char);
	res.send(emojis);
});

router.post<typeof Emoji, unknown>("/", async (req, res) => {
	if (!(typeof req.body.char === "string" && [...req.body.char].length === 1)) {
		res.status(400).send();
		return;
	}

	const emoji = new Emoji(req.body);
	emoji.validate().then(
		() => {
			emoji.save().then((emoji) => {
				res.status(201).send(emoji);
			});
		},
		(err) => res.status(400).send()
	);
});

router.delete<typeof Emoji, string>("/", async (req, res) => {
	const emoji = new Emoji(req.body);

	await emoji.validate().catch((err) => res.status(400).send(err));

	const emojis = await Emoji.find(req.body);
	if (emojis.length > 0) {
		const { deletedCount } = await Emoji.deleteMany(req.body).exec();
		res.status(200).send(`Delted: ${deletedCount} emojis.`);
	} else {
		res.status(404).send("Emoji not found.");
	}
});

export default router;
