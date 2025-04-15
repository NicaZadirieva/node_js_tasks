import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail()
	email: string;
	@IsString()
	password: string;
	@IsString()
	name: string;

	constructor(email: string, password: string, name: string) {
		this.email = email;
		this.password = password;
		this.name = name;
	}
}
