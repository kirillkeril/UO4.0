import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {MessagePattern, Payload, Transport} from "@nestjs/microservices";
import {Appeal} from "./entities/appeal";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @MessagePattern("appeal_parsed", Transport.RMQ)
    async getHello(@Payload() appeal: Appeal) {
        const result = await this.appService.handle(appeal);
        console.log(appeal);
    }
}
