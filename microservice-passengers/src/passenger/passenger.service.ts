import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}
  async create(createPassengerDto: CreatePassengerDto): Promise<IPassenger> {
    const newPassenger = new this.model(createPassengerDto);
    return await newPassenger.save();
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    updatePassengerDto: UpdatePassengerDto,
  ): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, updatePassengerDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
