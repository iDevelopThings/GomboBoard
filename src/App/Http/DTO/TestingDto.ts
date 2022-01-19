import {DataTransferObject} from "@envuso/core/Routing";
import {IsEmail, IsString, MinLength} from "class-validator";

export class TestingDto extends DataTransferObject {

	@IsString()
	@MinLength(3)
	username: string;

	@IsEmail()
	@MinLength(3)
	email: string;

}
