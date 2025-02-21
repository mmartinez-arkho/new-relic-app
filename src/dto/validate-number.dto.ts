// src/dto/validate-number.dto.ts
import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class ValidateNumberDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  value: number;
}
