import { ApiPropertyOptional,ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
    @ApiPropertyOptional({ default: 10 })
    take?: number;

    @ApiPropertyOptional({ default: 0 })
    skip?: number;

    @ApiPropertyOptional({default:"name:desc"})
    sortBy?: string;
}