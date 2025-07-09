import { IsNotEmpty, IsString, IsObject, IsOptional } from "class-validator";

export class CreatePageDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsString({ message: "Description must be a string" })
  @IsOptional()
  description?: string;

  @IsObject({ message: "Content must be an object" })
  @IsNotEmpty({ message: "Content is required" })
  content: Record<string, any>;
}