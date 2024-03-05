import { Controller } from '@nestjs/common';

import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constanst';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  findAll() {
    return this.flightService.findAll();
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.flightService.findOne(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.flightService.update(payload.id, payload.updateFlightDto);
  }

  @MessagePattern(FlightMSG.DELETE)
  remove(@Payload() id: string) {
    return this.flightService.remove(id);
  }

  @MessagePattern(FlightMSG.ADD_PASSANGER)
   addPassanger(@Payload() payload:any) {
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId,
    );
  }
}
