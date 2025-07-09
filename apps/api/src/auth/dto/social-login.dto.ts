import { IsEmail, IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class SocialLoginDto {
  @IsIn(["google", "facebook", "github"], {
    message: "Provider must be one of: google, facebook, github",
  })
  provider: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsOptional()
  name?: string; // Optional field for name, if available from the provider
}
