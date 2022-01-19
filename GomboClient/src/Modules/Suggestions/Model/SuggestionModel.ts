import {IsMongoId, IsOptional, IsString, MinLength} from "class-validator";
import {DataTransferObject, dto} from "api-utilities";
import {SuggestionsApi} from "../Api/SuggestionsApi";

@dto(SuggestionModel)
export class SuggestionModel extends DataTransferObject<SuggestionModel> {

	@IsOptional()
	@IsString()
	_id: string;

	@IsMongoId()
	@IsString()
	boardId: string;

	@IsString()
	@MinLength(5)
	title: string;

	@IsString()
	@MinLength(10)
	content: string;

	upVotes: number   = 0;
	downVotes: number = 0;


}
