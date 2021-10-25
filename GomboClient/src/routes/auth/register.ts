import {Http} from "../../Services/Api/Http";
import {authHandle} from "./_authHandle";


/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(request) {

	try {
		const res = await Http.post('/auth/register', {
			email    : request.body.email,
			password : request.body.password,
			name     : request.body.name,
		});

		return authHandle(request, res);
	} catch (error) {
		if (error?.response?.status === 422) {
			return {body : error?.response?.data, status : 422};
		}

		console.log(error);
	}

	return {body : {}};
}
