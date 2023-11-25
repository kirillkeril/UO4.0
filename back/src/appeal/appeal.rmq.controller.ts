import {Controller} from '@nestjs/common';
import {AppealService} from './appeal.service';
import {Ctx, MessagePattern, Payload, RmqContext, Transport} from "@nestjs/microservices";
import {Appeal, AppealDocument} from "./entities/appeal.entity";
import {ObjectId} from "mongoose";

@Controller()
export class AppealRmqController {
    constructor(private readonly appealService: AppealService) {
    }

    @MessagePattern("appeal_created", Transport.RMQ)
    async handleAppeals(@Payload() data: AppealDocument, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage()
        try {
            // TODO вызываем модель классификации -> возврат значений модели
            await this.appealService.handle(data._id.toString());
            // TODO обновить по id как??
        } catch (error) {
            // console.log(error);
        }
    }

    @MessagePattern("appeal_handled", Transport.RMQ)
    async saveAppeal(@Payload() data: Appeal & ObjectId, @Ctx() context: RmqContext) {
        console.log("appeal saved", data);
    }
}
