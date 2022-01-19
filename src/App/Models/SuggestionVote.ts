import {IsIP, IsNumber, IsString, MinLength} from "class-validator";
import {belongsTo, id, Model} from "@envuso/core/Database";
import {ObjectId} from "mongodb";
import {Board} from "./Board";
import {Suggestion} from "./Suggestion";

export class SuggestionVote extends Model<SuggestionVote> {

	@id
	_id: ObjectId;

	@id
	boardId: ObjectId;

	@belongsTo('Board', 'boardId', '_id')
	board: Board;

	@id
	suggestionId: ObjectId;

	@belongsTo('Suggestion', 'suggestionId', '_id')
	suggestion: Suggestion;

	type: 'up' | 'down';

	@IsIP()
	ip: string     = null;

	@id
	userId: ObjectId;

}
