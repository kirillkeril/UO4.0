import {Body, Controller, Post} from '@nestjs/common';
import {SourcesService} from './sources.service';
import {CreateSourceDto} from "./dto/create-source.dto";

@Controller('sources')
export class SourcesController {
    constructor(private readonly sourcesService: SourcesService) {
    }

    @Post()
    async create(@Body() source: CreateSourceDto) {
        return await this.sourcesService.create(source);
    }
}
