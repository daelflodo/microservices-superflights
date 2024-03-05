import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { env } from 'process';
import { RabbitMQ } from './common/constanst';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process, env.AMQP_URL],
      queue: RabbitMQ.FlightsQueue,
      // queueOptions:{
      //   durable:false
      // }
    },
  });
  await app.listen();
  console.log('Microservice Flights is Listening');
}
bootstrap();
