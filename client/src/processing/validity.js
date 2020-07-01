const charAtStartOrEnd = (string, char) => string.match(new RegExp(`^[^${char}].*[^${char}]$`, 'g')) === null;
const stringConsecutiveDots = (string) => string.match(new RegExp(/\.\./g)) !== null;

export const checkIfEmailValid = (email) => {
	if (charAtStartOrEnd(email, '.')) return false;
	const regex = new RegExp(/([a-zA-Z0-9._-]+)@([a-zA-Z0-9-]+)(\.[a-zA-Z]+)*/g);
	const matches = regex.exec(email);
	if (matches === null) return false;
	const [ full, local, domain, ext ] = matches;
	if (charAtStartOrEnd(local, '.') || stringConsecutiveDots(local)) return false;
	if (charAtStartOrEnd(domain, '-')) return false;
	return true;
};
