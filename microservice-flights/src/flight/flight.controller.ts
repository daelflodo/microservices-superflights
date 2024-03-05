import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';


@Controller()
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
  ) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }

  // @Post(':flightId/passenger/:passengerId')
  // @ApiOperation({summary:'relates a flight by flightId with a passenger by passengerId'})
  // async addPassanger(
  //   @Param('flightId') flightId: string,
  //   @Param('passengerId') passengerId: string,
  // ) {
  //   const passenger = await this.passengerService.findOne(passengerId);
  //   if (!passenger) throw new HttpException('Passenger Not Found', 401);

  //   return this.flightService.addPassenger(flightId, passengerId)
  // }
}
