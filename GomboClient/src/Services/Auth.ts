import {session} from "$app/stores";
import {UserModel} from "../Modules/User/Model/UserModel";

export class Auth {
	private static authedUser: UserModel | null = null;

	private static sessionSubscription = null;
	private static initiated: boolean  = false;
	private static token: string       = null;

	static initiate(baseSession) {
		this.setSessionValues(baseSession);

		if (this.initiated && this.sessionSubscription) {
			return;
		}

		this.sessionSubscription = session.subscribe(ses => {
			this.setSessionValues(ses);
		});

		this.initiated = true;
	}

	static setSessionValues(sessionVals) {
		this.authedUser = sessionVals.user ? UserModel.create(sessionVals.user as object) : null;
		this.token      = sessionVals.token ? sessionVals.token : null;
	}

	static check() {
		return this.authedUser !== null;
	}

	static jwt() {
		return this.token;
	}

	static checkIfAuthed(session) {
		const isAuthed = !!(session?.user && session?.user?._id && session?.token);

		return isAuthed;
	}

	static user(): UserModel {
		return this.authedUser;
	}
}
