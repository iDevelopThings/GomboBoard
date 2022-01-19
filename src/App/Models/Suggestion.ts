import {request} from "@envuso/core/Routing";
import {IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";
import {belongsTo, hasMany, id, Model} from "@envuso/core/Database";
import {ObjectId} from "mongodb";
import {Board} from "./Board";
import {SuggestionVote} from "./SuggestionVote";
import {User} from "./User";

export class Suggestion extends Model<Suggestion> {

	@id
	_id: ObjectId;

	@id
	boardId: ObjectId;

	@belongsTo('Board', 'boardId', '_id')
	board: Board;

	@hasMany('SuggestionVote', 'suggestionId', '_id')
	votes: SuggestionVote;

	@IsString()
	@MinLength(4)
	title: string;

	@IsString()
	@MinLength(10)
	content: string;

	@IsNumber()
	upVotes: number = 0;

	@IsNumber()
	downVotes: number = 0;

	@id
	userId: ObjectId;

	async hasVote(user: User): Promise<SuggestionVote> {
		return await SuggestionVote.query()
			.where({

				suggestionId : this._id,
				boardId      : this.boardId,

				$or : [
					{ip : request().ip()},
					{userId : user._id}
				]
			})
			.first();
	}

	async vote(direction: 'up' | 'down', user: User) {
		const vote = await this.hasVote(user);

		if (!vote) {
			await this.addVote(direction, user);
		} else {
			await Suggestion.query()
				.where('_id', this._id)
				.update({$inc : {[vote.type === 'up' ? 'upVotes' : 'downVotes'] : -1}});

			await SuggestionVote.query()
				.where({
					boardId      : this.boardId,
					suggestionId : this._id,
					userId       : user._id,
				}).delete();
		}
	}

	async addVote(direction: 'up' | 'down', user: User) {
		await Suggestion.query()
			.where('_id', this._id)
			.update({$inc : {[direction === 'up' ? 'upVotes' : 'downVotes'] : 1}});

		await SuggestionVote.create({
			boardId      : this.boardId,
			suggestionId : this._id,
			type         : direction,
			ip           : request().ip(),
			userId       : user._id,
		});
	}

}
