import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Appeal} from "./entities/appeal";

@Injectable()
export class AppService {
    constructor(@Inject("appeal") private readonly service: ClientProxy) {
    }

    async handle(appeal: Appeal) {
        const result = {};
        // TODO дернуть 1 нейронку, подождать
        // TODO дернуть 2 нейронку, подождать
        this.service.send("appeal_handled", result);
    }
}
