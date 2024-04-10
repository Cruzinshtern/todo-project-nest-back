import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, QueryWithHelpers } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private _userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			//Check is user with such email already exists
			const isUserExist = await this.getUserByEmail(createUserDto.email);
			if (isUserExist) {
				throw new HttpException('User with such email already exist', HttpStatus.CONFLICT);
			}

			//Continue with creation of a user
			const newUser = await new this._userModel(createUserDto);
			return await newUser.save();
		} catch (err) {
			return err;
		}
	}

	async getAll(): Promise<User[]> {
		return await this._userModel.find();
	}

	async getUserById(id: string): Promise<QueryWithHelpers<UserDocument, any>> {
		try {
			const user = await this._userModel.findOne({
				_id: new ObjectId(id),
			});
			if (!user) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}
			return user;
		} catch (err) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
	}

	async getUserByEmail(email: string): Promise<QueryWithHelpers<UserDocument, any>> {
		try {
			return await this._userModel.findOne({ email });
		} catch (err) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
	}
}
