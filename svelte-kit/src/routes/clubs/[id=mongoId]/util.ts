import { type ClubDocument } from '$lib/models/Club';
import mongoose from 'mongoose';

export function isUserInClub(club: ClubDocument, userId: mongoose.Types.ObjectId) {
	if (club.owner?._id.equals(userId)) return true;

	return club.members.some((member) => member.user?.equals(userId));
}

export function addUserToClub(userId: mongoose.Types.ObjectId, club: ClubDocument) {
	if (!isUserInClub(club, userId)) {
		club.members.push({ user: userId, pending: true });
		club.save();
	}
}
