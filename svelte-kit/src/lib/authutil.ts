import type { Session } from '@auth/sveltekit';

export function isAdmin(session?: Session | null) {
	return session?.user?.isAdmin;
}

export function isOwner(ownerId: string | null | undefined, session: Session | null | undefined) {
	return session?.user?.id === ownerId;
}

export function isOwnerOrAdmin(
	ownerId: string | null | undefined,
	session: Session | null | undefined
) {
	return isOwner(ownerId, session) || isAdmin(session);
}
