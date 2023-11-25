import {Inject, Injectable} from '@nestjs/common';
import {CreateSourceDto} from "./dto/create-source.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Source} from "./entities/source";
import {Model} from "mongoose";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class SourcesService {
    constructor(
        @InjectModel(Source.name) private sourcesRepository: Model<Source>,
        @Inject("appeal") private readonly rmqService: ClientProxy
    ) {
    }

    async create(dto: CreateSourceDto) {
        const res = await this.sourcesRepository.create({...dto});
        this.rmqService.send("source_created", res.link).subscribe((value) => {
            console.log("created new source", value);
            return res;
        });
    }
}
