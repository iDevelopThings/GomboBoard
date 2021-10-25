import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {id, Model} from "@envuso/core/Database";
import {ObjectId} from "mongodb";
import {Suggestion} from "./Suggestion";

export class Board extends Model<Board> {

	@id
	_id: ObjectId;

	@id
	userId: ObjectId;

	@IsString()
	title: string;

	suggestions() {
		return Suggestion.query().where('boardId', this._id);
	}

}
