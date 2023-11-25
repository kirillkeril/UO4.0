import {Inject, Injectable} from '@nestjs/common';
import {CreateSourceDto} from "./dto/create-source.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Source} from "./entities/source";
import {Model} from "mongoose";
import {ClientProxy} from "@nestjs/microservices";
import {HttpService} from "@nestjs/axios";
import * as process from "process";
import {firstValueFrom} from "rxjs";

@Injectable()
export class SourcesService {
    constructor(
        @InjectModel(Source.name) private sourcesRepository: Model<Source>,
        @Inject("appeal_source") private readonly rmqService: ClientProxy,
        private readonly httpService: HttpService,
    ) {
    }

    async onApplicationBootstrap() {
        const res = await this.rmqService.connect();
        console.log(res);
    }

    async create(dto: CreateSourceDto) {
        try {
            const res = await this.sourcesRepository.create({...dto});
            // this.rmqService.send("source created", res.link).subscribe((value) => {
            //     console.log("created new source");
            //     // return res;
            // });
            const {data, status} = await firstValueFrom(this.httpService.post(process.env.CREATE_SOURCE_HANDLER, dto));
            console.log(data, status);
        } catch (e) {
            console.log("ОШИБКА ", e);
        }
    }
}
