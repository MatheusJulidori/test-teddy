import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: 5000.0 })
  @IsNumber()
  salary: number;

  @ApiProperty({ example: 150000.0 })
  @IsNumber()
  companyValue: number;
}
