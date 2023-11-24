import { PartialType } from '@nestjs/mapped-types';
import { CreateAppealDto } from './create-appeal.dto';

export class UpdateAppealDto extends PartialType(CreateAppealDto) {
    author?: string;
    title?: string;
    body?: string;
}
