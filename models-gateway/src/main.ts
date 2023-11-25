import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';


async function bootstrap() {
    // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    //     transport: Transport.RMQ,
    //     options: {
    //         urls: [process.env.RABBIT_CONNECTION],
    //         queue: "appeals",
    //         queueOptions: {
    //             durable: true
    //         }
    //     }
    // });
    const app = await NestFactory.create(AppModule);
    await app.listen(5002);
}

bootstrap();
