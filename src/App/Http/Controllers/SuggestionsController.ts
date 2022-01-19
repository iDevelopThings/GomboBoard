import {
	Controller,
	controller,
	get,
	put,
	post,
	patch,
	user,
	destroy,
	middleware,
	dto,
	response,
	DtoValidationException,
	request,
	JwtAuthenticationMiddleware
} from "@envuso/core/Routing";
import {ObjectId} from "mongodb";
import {Board} from "../../Models/Board";
import {Suggestion} from "../../Models/Suggestion";
import {User} from "../../Models/User";
import {CreateSuggestionDto} from "../DTO/Suggestions/CreateSuggestionDto";


@controller('/suggestions')
export class BoardController extends Controller {

	@get('/:board')
	async list(board: Board) {
		const suggestions = await board.suggestions().get();

		return response().json(suggestions);
	}

	@middleware(new JwtAuthenticationMiddleware())
	@put('/:board')
	async create(board: Board, @dto() createSuggestionDto: CreateSuggestionDto, @user user: User) {

		if (!board._id.equals(createSuggestionDto.boardId)) {
			throw new DtoValidationException({boardId : "The specified board id does not match."});
		}

		const suggestion = await Suggestion.create({
			boardId : new ObjectId(createSuggestionDto.boardId),
			title   : createSuggestionDto.title,
			content : createSuggestionDto.content,
			userId  : user._id,
		});

		return response().json(suggestion);
	}

	@middleware(new JwtAuthenticationMiddleware())
	@put('/:boardId/:suggestion/vote')
	async vote(suggestion: Suggestion, @user user: User) {
		const direction = request<'up' | 'down'>('vote');

		await suggestion.vote(direction, user);

		await suggestion.refresh();

		return response().json(suggestion);
	}


}
