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
        const {
            data: themeGroup,
            status: themeStatus
        } = await firstValueFrom(this.httpService.post("http://ai.vp-pspu.cf:8080/predict", {body: appeal.body}));
        // console.log("группа", themeGroup, themeStatus);

        const {
            data: theme,
            status: groupStatus
        } = await firstValueFrom(this.httpService.post("http://ai.vp-pspu.cf:8000/predict", {body: appeal.body}));
        // console.log("тема", theme, groupStatus);

        // const {
        //     data: tags,
        //     status: status
        // } = await firstValueFrom(this.httpService.post("http://localhost:8000", {body: appeal.body}));
        // console.log(tags, status);

        this.service.send("appeal_handled", appeal).subscribe(val => {
        });
        appeal.mark = 'OLD';
        appeal.theme = theme['predicted_category'];
        appeal.themeGroup = themeGroup['predicted_category'];
        return appeal;
    }
}
