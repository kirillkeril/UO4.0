import {Controller} from '@nestjs/common';
import {AppealService} from './appeal.service';
import {Ctx, EventPattern, Payload, RmqContext, Transport} from "@nestjs/microservices";
import {AppealDocument} from "./entities/appeal.entity";

@Controller()
export class AppealRmqController {
    constructor(private readonly appealService: AppealService) {
    }

    @EventPattern("appeal_created", Transport.RMQ)
    async handleAppeals(@Payload() data: AppealDocument, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage()
        try {
            // TODO вызываем модель классификации -> возврат значений модели
            const res = data;
            console.log(res, context.getMessage());
            await this.appealService.handle(res._id.toString());
            await channel.ack(originalMsg);
            // TODO обновить по id как??
        } catch (error) {
            console.log(error);
        }
    }
}
