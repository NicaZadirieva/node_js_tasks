import { IsEmail } from 'class-validator';

export class UserLoginDto {
	@IsEmail()
	email: string;
	password: string;
	name: string;

	constructor(email: string, password: string, name: string) {
		this.email = email;
		this.password = password;
		this.name = name;
	}
}
