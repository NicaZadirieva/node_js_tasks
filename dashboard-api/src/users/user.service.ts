import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}
	async createUser(dto: UserRegisterDto): Promise<User | null> {
		const newUser = new User(dto.email, dto.name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(dto.password, Number(salt));
		// проверка что он есть
		// если есть - возвращаем null
		// если нет - создаем
		return newUser;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
