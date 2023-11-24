import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {AppealService} from './appeal.service';
import {CreateAppealDto} from './dto/create-appeal.dto';
import {UpdateAppealDto} from './dto/update-appeal.dto';

@Controller('appeal')
export class AppealController {
    constructor(private readonly appealService: AppealService) {
    }

    @Post()
    create(@Body() createAppealDto: CreateAppealDto) {
        return this.appealService.create(createAppealDto);
    }

    @Get()
    findAll() {
        return this.appealService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.appealService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAppealDto: UpdateAppealDto) {
        return this.appealService.update(id, updateAppealDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.appealService.remove(id);
    }
}
