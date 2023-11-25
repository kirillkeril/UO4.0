import {Controller} from '@nestjs/common';
import {AppService} from "./app.service";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";

interface Handler {
    link: string;
}

@Controller()
export class RmqController {
    constructor(private readonly service: AppService) {
    }

    @MessagePattern("source_created")
    async handle(@Payload() link: string, @Ctx() context: RmqContext) {
        this.service.handle(link).then(() => {
            console.log("new source handled")
        });
    }
}
