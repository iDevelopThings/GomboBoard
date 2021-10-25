import {Http} from "../../../Services/Api/Http";
import {SuggestionModel} from "../Model/SuggestionModel";
import {suggestions} from "../SuggestionsState";

export class SuggestionsApi {

	static async create(values: SuggestionModel): Promise<SuggestionModel> {
		const response = await Http.put(`/suggestions/${values.boardId}`, values);

		return SuggestionModel.create(response as object);
	}

	static async list(boardId: string): Promise<SuggestionModel[]> {
		const response = await Http.get(`/suggestions/${boardId}`);

		return SuggestionModel.create(response as object[]);
	}

	public static async vote(suggestion: SuggestionModel, direction: "up" | "down"): Promise<SuggestionModel> {
		const response = await Http.put(`/suggestions/${suggestion.boardId}/${suggestion._id}/vote`, {
			vote : direction
		});

		return SuggestionModel.create(response as object);
	}
}
