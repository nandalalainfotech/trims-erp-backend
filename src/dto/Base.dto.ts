import { IsNotEmpty } from "class-validator";

export class BaseDTO {

    @IsNotEmpty()
    insertUser: string;

    @IsNotEmpty()
    insertDatetime: Date;

    updatedUser: string | null;
    
    updatedDatetime: Date | null;
} 