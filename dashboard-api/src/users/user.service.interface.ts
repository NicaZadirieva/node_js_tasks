import { UserModel } from '@prisma/client';
import { UserGetInfoDto } from './dto/user.getInfo.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getInfo: (dto: UserGetInfoDto) => Promise<UserModel | null>;
}
