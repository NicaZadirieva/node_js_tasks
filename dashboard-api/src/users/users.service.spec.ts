import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserService } from './user.service';
import { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};
const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let userService: IUserService;
let createdUser: UserModel | null;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.IConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce((user: User): UserModel => {
			return {
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			};
		});
		createdUser = await userService.createUser({
			email: 'a@gmail.ru',
			name: 'Nica',
			password: '1',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

    it('Success Validate User', async () => {
        usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
        const isValid = await userService.validateUser({ email: 'a@gmail.ru' , password: '1', name: 'Nica'});
        expect(isValid).toBeTruthy();
    });

    it('No Valid User Password', async () => {
        usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
        const isValid = await userService.validateUser({ email: 'a@gmail.ru' , password: '12323', name: 'Nica'});
        expect(isValid).toBeFalsy();
    })

    it('No Valid User: not exist', async () => {
        usersRepository.find = jest.fn().mockReturnValueOnce(null);
        const isValid = await userService.validateUser({ email: 'a@gmail.ru' , password: '12323', name: 'Nica'});
        expect(isValid).toBeFalsy();
    })
});
