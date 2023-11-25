import {Body, Controller, Post} from '@nestjs/common';
import {AppService} from './app.service';

interface Handler {
    link: string;
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post()
    async handle(@Body() data: Handler) {
        console.log(data);
        return await this.appService.handle(data.link);
    }
}
