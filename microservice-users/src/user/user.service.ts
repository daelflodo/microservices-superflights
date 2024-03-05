import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import { USER } from 'src/common/models/models';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.model({ ...createUserDto, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(updateUserDto.password);
    const user = { ...updateUserDto, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async findByUsername(username: string) {
    return await this.model.findOne({
      username,
    });
  }

  async checkPassword(password: string, passwordDb: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDb);
  }
}
