import {ApiProperty} from "@nestjs/swagger";

export class CreateAppealDto {
    @ApiProperty()
    body: string;
}
