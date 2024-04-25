import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { MESSAGE } from 'src/shared/mesages.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcryptjs = require('bcryptjs');

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private _userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto): Promise<User | HttpException> {
		//Check is user with such email already exists
		const isUserExist = await this.getUserByEmail(createUserDto.email);
		if (isUserExist) {
			throw new HttpException(MESSAGE.USER_EXISTS, HttpStatus.CONFLICT);
		}

		//Continue with creation of a user
		const hashedPassword = await bcryptjs.hash(createUserDto.password, Number(process.env.PASSWORD_SALT));
		const newUser = await new this._userModel({ ...createUserDto, password: hashedPassword });
		return await newUser.save();
	}

	async getAll(): Promise<User[]> {
		try {
			return await this._userModel.find();
		} catch (err) {
			return err;
		}
	}

	async getUserById(id: string): Promise<User> {
		try {
			const user = await this._userModel.findOne({
				_id: new ObjectId(id),
			});
			if (!user) {
				throw new HttpException(MESSAGE.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
			}
			return user;
		} catch (err) {
			throw new HttpException(MESSAGE.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	async getUserByEmail(email: string): Promise<User> {
		try {
			return await this._userModel.findOne({ email });
		} catch (err) {
			throw new HttpException(MESSAGE.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
