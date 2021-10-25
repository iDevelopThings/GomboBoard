import {writable} from "svelte/store";
import {BoardApi} from "./Api/BoardApi";
import type {BoardModel} from "./Model/BoardModel";

export const currentBoard          = writable<BoardModel>(null);
export const isLoadingCurrentBoard = writable(true);

export const loadBoard = async (id: string) => {
	isLoadingCurrentBoard.set(true);

	currentBoard.set(await BoardApi.get(id));

	isLoadingCurrentBoard.set(false);
};

export const boards          = writable<BoardModel[]>([]);
export const isLoadingBoards = writable(true);

export const getBoards = async () => {
	isLoadingBoards.set(true);

	const boardsResult = await BoardApi.list();

	boards.set(boardsResult);

	isLoadingBoards.set(false);
};
