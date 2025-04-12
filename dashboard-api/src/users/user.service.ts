import { UserModel } from '@prisma/client';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = this.usersRepository.find(email);
		if (!existedUser) {
			// еще нет такого юзера
			return await this.usersRepository.create(newUser);
		}
		return null;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		const user = await this.usersRepository.find(dto.email);
		if (user) {
			return await compare(dto.password, user.password);
		}
		return false;
	}
}
