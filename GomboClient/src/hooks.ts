import * as cookie from 'cookie';


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({request, resolve}) {
	const cookies = cookie.parse(request.headers.cookie || '');

	if (cookies.jwt && cookies.jwt !== '') {
		const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');

		try {
			const dat = JSON.parse(jwt);

			request.locals.user  = dat.user;
			request.locals.token = dat.token;
		} catch (e) {
			console.error(e);

			request.locals.user  = null;
			request.locals.token = null;
		}
	}

	const response = await resolve(request);

	return {
		...response,
		headers : {
			...response.headers,
		}
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return {
		user  : request.locals.user ?? null,
		token : request.locals.token ?? null,
	};
}
