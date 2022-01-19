import {Controller, controller, get, put, post, patch, destroy, middleware, dto, response, JwtAuthenticationMiddleware, user} from "@envuso/core/Routing";
import {Board} from "../../Models/Board";

import {TestingDto} from "../DTO/TestingDto";

//@middleware()
@controller('/test')
export class TestingController extends Controller {

	@get('/')
	async get() {
		return {
			id       : 1,
			username : 'aids',
		};
	}

	@get('/list')
	async list() {
		return [
			{
				id       : 1,
				username : 'aids',
			},
			{
				id       : 2,
				username : 'mr aids',
			},
		];
	}
	@get('/paginated')
	async paginated() {
		return Board.query().paginate(20);
	}

	@post('/error')
	async error(@dto() dto: TestingDto) {

	}


}
