import { IsString, IsObject, IsOptional } from "class-validator";

export class UpdatePageDto {
  @IsString({ message: "Name must be a string" })
  @IsOptional()
  name?: string;

  @IsString({ message: "Description must be a string" })
  @IsOptional()
  description?: string;

  @IsObject({ message: "Content must be an object" })
  @IsOptional()
  content?: Record<string, any>;
}