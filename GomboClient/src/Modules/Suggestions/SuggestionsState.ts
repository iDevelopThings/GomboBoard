import {writable} from "svelte/store";
import {SuggestionsApi} from "./Api/SuggestionsApi";

export const suggestions          = writable([]);
export const isLoadingSuggestions = writable(true);

export const loadSuggestions = async (boardId: string) => {
	isLoadingSuggestions.set(true);

	suggestions.set(await SuggestionsApi.list(boardId));

	isLoadingSuggestions.set(false);
};
