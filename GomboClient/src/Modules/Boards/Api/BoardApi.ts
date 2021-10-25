import {Http} from "../../../Services/Api/Http";
import {BoardModel} from "../Model/BoardModel";

export class BoardApi {

	static async create(values: BoardModel): Promise<BoardModel> {
		const response = await Http.put('/boards', values);

		return BoardModel.create(response as object);
	}

	static async get(id: string): Promise<BoardModel> {
		const response = await Http.get(`/boards/${id}`);

		return BoardModel.create(response as object);
	}

	static async list(): Promise<BoardModel[]> {
		const response = await Http.get('/boards');

		return BoardModel.create(response as any[]);
	}


}
