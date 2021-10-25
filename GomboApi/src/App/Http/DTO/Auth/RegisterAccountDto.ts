import {DataTransferObject} from "@envuso/core/Routing";
import {IsEmail, IsMongoId, IsString, MinLength} from "class-validator";
import {ObjectId} from "mongodb";

export class RegisterAccountDto extends DataTransferObject {

	@IsString()
	@IsEmail()
	email: string;

	@MinLength(6)
	@IsString()
	password: string;

	@IsString()
	name: string;

}
