import {Http} from "../../Services/Api/Http";
import {authHandle} from "./_authHandle";


/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(request) {

	return {
		headers : {'set-cookie' : `jwt=; Path=/; Max-Age=-1; HttpOnly`},
		body    : {},
	};

}
