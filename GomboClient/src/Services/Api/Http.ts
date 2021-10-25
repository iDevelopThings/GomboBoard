import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Auth} from "../Auth";

export class Http {

	static _token: string = null;

	public static apiBaseUrl() {
		return 'http://127.0.0.1:8081';
	}

	public static wsUrl() {
		return 'ws://127.0.0.1:3335';
	}

	private static _instance() {
		const headers = {
			'Content-Type' : 'application/json',
			'Accept'       : 'application/json',
		};
		if (Auth.check()) {
			headers['Authorization'] = `Bearer ${Auth.jwt()}`;
		}
		const instance = axios.create({
			baseURL         : this.apiBaseUrl(),
			headers         : headers,
			withCredentials : true,
		});

		instance.interceptors.response.use(
			this._onFulfilled,
			this._onRejected,
		);

		return instance;
	}

	public static get<T>(endpoint: string, params: object = {}): Promise<any> {
		return this._instance().get<T>(endpoint, {
			params : params,
		});
	}

	public static put<T>(endpoint: string, params: object = {}): Promise<any> {
		return this._instance().put<T>(endpoint, params);
	}

	public static patch<T>(endpoint: string, params: object = {}): Promise<any> {
		return this._instance().patch<T>(endpoint, params);
	}

	public static post<T>(endpoint: string, params: object = {}): Promise<any> {
		return this._instance().post<T>(endpoint, params);
	}

	public static delete<T>(endpoint: string, params: object = {}): Promise<any> {
		return this._instance().delete<T>(endpoint, {
			params : params,
		});
	}

	private static _onFulfilled(value: AxiosRequestConfig): AxiosResponse | Promise<AxiosResponse> {
		return value.data;
	}

	private static _onRejected(error: any) {
		return Promise.reject(error);
	}


}
