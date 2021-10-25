import {DataTransferObject} from "@envuso/core/Routing";
import {IsMongoId, IsString, MinLength} from "class-validator";
import {ObjectId} from "mongodb";

export class CreateSuggestionDto extends DataTransferObject {

	@IsMongoId()
	boardId: string;

	@IsString()
	@MinLength(4)
	title: string;

	@IsString()
	@MinLength(10)
	content: string;

}
