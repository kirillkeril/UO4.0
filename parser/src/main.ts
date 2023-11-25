import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const rabbit = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://rmq:5672'],
            queue: 'appeals',
            queueOptions: {
                durable: false
            },
        }
    });

    await app.startAllMicroservices();
    await app.listen(3000);
}

bootstrap();
