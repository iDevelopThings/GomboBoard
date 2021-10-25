import {Auth} from "@envuso/core/Authentication";
import {Hash} from "@envuso/core/Crypt";
import {Controller, controller, get, put, post, patch, destroy, middleware, dto, response, DtoValidationException} from "@envuso/core/Routing";
import {Board} from "../../Models/Board";
import {User} from "../../Models/User";
import {LoginAccountDto} from "../DTO/Auth/LoginAccountDto";
import {RegisterAccountDto} from "../DTO/Auth/RegisterAccountDto";

@controller('/auth')
export class AuthController extends Controller {

	@post('/register')
	async register(@dto() credentials: RegisterAccountDto) {

		if (await User.query().where('email', credentials.email).first()) {
			throw new DtoValidationException({
				email : 'This email is already in use.'
			});
		}

		const user = await User.create({
			email    : credentials.email,
			name     : credentials.name,
			password : await Hash.make(credentials.password),
		});

		return response().json({
			user,
			token : user.generateToken()
		});
	}

	@post('/login')
	async login(@dto() credentials: LoginAccountDto) {

		if (!await Auth.attempt(credentials)) {
			throw new DtoValidationException({
				email : 'The provided credentials are invalid.'
			});
		}

		console.log('Is authed:', Auth.check());

		const user: User = Auth.user();

		return response().json({
			user,
			token : user.generateToken(),
		});

	}


}
