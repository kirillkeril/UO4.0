import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const rmq = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://rmq:16007'],
            queue: 'appeals',
            queueOptions: {
                durable: false
            },
        }
    });

    const config = new DocumentBuilder()
        .setTitle('Appeals')
        .setVersion('0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.enableCors({
        origin: true,
    });

    await rmq.init();
    await app.listen(process.env.PORT);
}

bootstrap().then(() => {
});

console.log(`Server started on port ${process.env.PORT}`)

