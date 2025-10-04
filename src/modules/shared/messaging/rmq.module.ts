import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
  {
    name: "MAIL_SERVICE",
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://guest:guest@localhost:5672"],
      queue: "mail_queue",
      queueOptions: { durable: true },
    },
  },
])
  ],
  exports: [ClientsModule],
})
export class RmqModule {}
