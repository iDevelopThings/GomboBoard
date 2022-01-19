import {IsEmail, IsMongoId, IsOptional, IsString, MinLength} from "class-validator";
import {DataTransferObject, dto} from "api-utilities";

@dto(UserModel)
export class UserModel extends DataTransferObject<UserModel> {

	@IsOptional()
	@IsString()
	_id: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	name: string;

}
