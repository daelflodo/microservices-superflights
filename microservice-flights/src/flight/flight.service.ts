import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FLIGHT } from 'src/common/models/models';
import { IFlight } from 'src/common/interfaces/flight.interface';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}
  async create(createFlightDto: CreateFlightDto): Promise<IFlight> {
    const newFlight = new this.model(createFlightDto);
    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id).populate('passengers');
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, updateFlightDto, {
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

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    // Utiliza el operador $addToSet para agregar el passengerId al conjunto de pasajeros.
    // Si passengerId ya existe en el conjunto, no se realizará ninguna acción.
    return await this.model.findByIdAndUpdate(
      flightId,
      {
        $addToSet: { passengers: passengerId },
      },
      { new: true },
    ).populate('passengers');
  }
}
