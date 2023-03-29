export interface User {
	id: string;
	password: string;
	name: string;
}

export interface Birth {
	birthYear: string;
	birthMonth: string;
	birthDay: string;
}

export type UserState = {
	user: {
		password: string;
	};
};
