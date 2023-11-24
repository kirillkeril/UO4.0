import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateAppealDto} from './dto/create-appeal.dto';
import {UpdateAppealDto} from './dto/update-appeal.dto';
import {Appeal} from "./entities/appeal.entity";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class AppealService {
    constructor(@InjectModel(Appeal.name) private appealRepository: Model<Appeal>,
                private readonly httpService: HttpService,
                @Inject("appeal") private readonly rmqService: ClientProxy) {
    }

    async create(createAppealDto: CreateAppealDto): Promise<Appeal> {
        const entity = await this.appealRepository.create({...createAppealDto, mark: ""});
        await entity.save();
        this.rmqService.send("appeal_created", entity).subscribe();
        return entity;
    }

    async findAll(): Promise<Appeal[]> {
        return this.appealRepository.find();
    }

    async findOne(id: string): Promise<Appeal> {
        const appeal = await this.appealRepository.findById(id);
        if (!appeal) throw new NotFoundException();
        return appeal;
    }

    async update(id: string, updateAppealDto: UpdateAppealDto): Promise<Appeal> {
        const appeal = await this.appealRepository.findById(id);
        if (appeal) throw new NotFoundException();
        const props = Object.keys(updateAppealDto);
        props.map(p => {
            appeal[p] = updateAppealDto[p] ?? appeal[p];
        });
        return appeal;
    }

    async handle(id: string) {
        const appeal = await this.appealRepository.findById(id);
        if (!appeal) throw new NotFoundException();
        const {data} = await firstValueFrom(this.httpService.post("http://ml:8000", {
            "body": appeal.body,
        }));
        appeal.executor = data['executor'];
        appeal.theme = data['theme'];
        appeal.themeGroup = data['themeGroup'];
        appeal.tags = data['tags'];

        await appeal.save();
    }

    async remove(id: string) {
        await this.appealRepository.findByIdAndRemove(id);
    }
}
