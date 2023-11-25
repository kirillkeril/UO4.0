import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Appeal} from "./entities/appeal";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Injectable()
export class AppService {
    constructor(@Inject("appeal") private readonly service: ClientProxy, private readonly httpService: HttpService) {
    }

    async handle(appeal: Appeal) {
        // TODO дернуть 1 нейронку, подождать
        const {
            data: themeGroup,
            status: themeStatus
        } = await firstValueFrom(this.httpService.post("ai.vp-pspu.cf", {body: appeal.body}));
        console.log(themeGroup, themeStatus);
        // TODO дернуть 2 нейронку, подождать
        const {
            data: theme,
            status: groupStatus
        } = await firstValueFrom(this.httpService.post("ai.vp-pspu.cf", {body: appeal.body}));
        console.log(theme, groupStatus);

        // const {
        //     data: tags,
        //     status: status
        // } = await firstValueFrom(this.httpService.post("http://localhost:8000", {body: appeal.body}));
        // console.log(tags, status);

        this.service.send("appeal_handled", appeal).subscribe(val => {
        });
        appeal.mark = 'OLD';
        return appeal;
    }
}
