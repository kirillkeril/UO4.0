import {PartialType} from '@nestjs/mapped-types';
import {CreateAppealDto} from './create-appeal.dto';

export class UpdateAppealDto extends PartialType(CreateAppealDto) {
    executor?: string;
    theme?: string;
    themeGroup?: string;
    tags?: string[];
    body?: string;
    mark?: string;
}
