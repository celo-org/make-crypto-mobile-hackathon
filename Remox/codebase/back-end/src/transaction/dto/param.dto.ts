import { ApiProperty } from "@nestjs/swagger";

export class ParamDto {
    @ApiProperty({description:"Transaction hash"})
    hash:string
}