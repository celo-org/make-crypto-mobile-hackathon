import { ApiProperty } from "@nestjs/swagger";

export class ParamDto {
    @ApiProperty({description:"Id of Member"})
    id:string
}