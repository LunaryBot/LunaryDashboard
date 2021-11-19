export const encode = (obj: { [key: string]: unknown }) => {
	let string = '';
	for (const [K, V] of Object.entries(obj)) {
		if (!V) continue;
		string += `&${encodeURIComponent(K)}=${encodeURIComponent(`${V}`)}`;
	}
	return string.substring(1);
};