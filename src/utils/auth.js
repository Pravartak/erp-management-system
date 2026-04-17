const TOKEN_KEY = "Token";
const ROLE_KEY = "Role";

const decodeTokenPayload = (token) => {
	try {
		const payload = token.split(".")[1];
		const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
		const decodedPayload = atob(normalizedPayload);

		return JSON.parse(decodedPayload);
	} catch {
		return null;
	}
};

export const clearAuthStorage = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(ROLE_KEY);
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredRole = () => localStorage.getItem(ROLE_KEY);

export const hasValidToken = () => {
	const token = getStoredToken();

	if (!token) {
		return false;
	}

	const payload = decodeTokenPayload(token);

	if (!payload?.exp) {
		return false;
	}

	return payload.exp * 1000 > Date.now();
};
