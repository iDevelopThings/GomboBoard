import {IsOptional, IsString, MinLength} from "class-validator";
import {DataTransferObject, dto} from "../../../Services/ClassDataTransferObjects";

@dto(BoardModel)
export class BoardModel extends DataTransferObject<BoardModel> {

	@IsOptional()
	@IsString()
	_id: string;

	@IsString()
	@MinLength(5)
	title: string;

	get url() {
		return `/boards/${this._id}`;
	}
}
