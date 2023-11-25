import {Body, Controller, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {Appeal} from "./entities/appeal";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post()
    async handle(@Body() appeal: Appeal) {
        const result = await this.appService.handle(appeal);
        console.log(appeal, result);
    }
}
