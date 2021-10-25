export const authHandle = (request, res) => {
	if (!res?.user && !res?.token) {
		return {body : {}};
	}

	const json  = JSON.stringify(res);
	const value = Buffer.from(json).toString('base64');

	request.locals.user  = res.user;
	request.locals.token = res.token;

	const currentDate   = new Date().getTime();
	const expiresAt     = currentDate + ((((60 * 1000) * 60) * 24) * 7);
	const expiresAtDate = new Date(expiresAt).toUTCString();

	return {
		headers : {'set-cookie' : `jwt=${value}; Path=/; Expires=${expiresAtDate}; HttpOnly`},
		body    : res,
	};
};
