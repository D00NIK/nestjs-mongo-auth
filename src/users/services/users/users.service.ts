import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = encodePassword(createUserDto.password);
    const adderUser = new this.userModel(createUserDto);

    return await adderUser.save();
  }

  async getUserByName(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async getUserByObjectId(_id: Types.ObjectId) {
    return await this.userModel.findById(_id);
  }
}
