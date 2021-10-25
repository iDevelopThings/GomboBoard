import {Controller, controller, get, put, post, patch, destroy, middleware, dto, response, JwtAuthenticationMiddleware, user} from "@envuso/core/Routing";
import {Board} from "../../Models/Board";
import {User} from "../../Models/User";
import {CreateBoardDto} from "../DTO/Boards/CreateBoardDto";

//@middleware()
@controller('/boards')
export class BoardController extends Controller {

	@middleware(new JwtAuthenticationMiddleware())
	@get('/')
	async list(@user user: User) {
		const boards = await Board
			.query()
			.where('userId', user._id)
			.get();

		return response().json(boards);
	}

	@get('/:board')
	async get(board: Board) {
		return response().json(board);
	}

	@middleware(new JwtAuthenticationMiddleware())
	@put('/')
	async create(@dto() boardDto: CreateBoardDto, @user user: User) {
		const board = await Board.create({...boardDto, userId: user._id});

		return response().json(board);
	}


}
