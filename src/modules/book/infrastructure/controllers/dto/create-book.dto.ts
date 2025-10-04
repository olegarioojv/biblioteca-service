import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    author: string

    @IsString()
    category: string

    @IsBoolean()
    available: boolean
}