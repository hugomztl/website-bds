export function formatName(email: string) {
	const name = email.split('@')[0];
	const dotIndex = name.indexOf('.');

	if (dotIndex === -1) {
		throw new Error('Invalid email');
	}

	const formattedName = name
		.split('.')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');

	const formattedNameWithoutNumbers = formattedName.replace(/\d/g, '');

	return formattedNameWithoutNumbers;
}
