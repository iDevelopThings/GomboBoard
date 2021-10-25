import {IsEmail, IsMongoId, IsOptional, IsString, MinLength} from "class-validator";
import {DataTransferObject, dto} from "../../../Services/ClassDataTransferObjects";

@dto(TempUserModel)
export class TempUserModel extends DataTransferObject<TempUserModel> {

	@IsString({groups : ['login', 'register']})
	@IsEmail(undefined, {groups : ['login', 'register']})
	email: string;

	@MinLength(6, {groups : ['login', 'register']})
	@IsString({groups : ['login', 'register']})
	password: string;

	@IsString({groups : ['register']})
	@MinLength(1, {groups : ['register']})
	name: string;

}
