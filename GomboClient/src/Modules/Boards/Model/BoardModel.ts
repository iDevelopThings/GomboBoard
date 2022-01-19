import {DataTransferObject, dto} from "api-utilities";
import {IsOptional, IsString, MinLength} from "class-validator";

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
