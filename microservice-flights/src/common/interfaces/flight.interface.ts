import { IPassenger } from "./passenger.interface";

export interface IFlight extends Document {
  pilot: string;
  airplalne: string;
  destinationCity: string;
  flightDate: Date;
  passengers: IPassenger[];
}
