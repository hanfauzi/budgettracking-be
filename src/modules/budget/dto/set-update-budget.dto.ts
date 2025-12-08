import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
} from "class-validator";

export class SetUpdateBudgetDTO {

  @IsString()
  @Matches(/^\d{4}-\d{2}$/, {
    message: "period must be in format YYYY-MM (e.g. 2025-12)",
  })
  period!: string;

  @IsInt()
  @IsPositive()
  amount!: number;
}
