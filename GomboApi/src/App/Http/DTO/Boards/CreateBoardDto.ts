import {DataTransferObject} from "@envuso/core/Routing";
import {IsString, MinLength} from "class-validator";

export class CreateBoardDto extends DataTransferObject {

	@IsString()
	@MinLength(3)
	title: string;

}
