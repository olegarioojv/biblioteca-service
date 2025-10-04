import { Inject, Injectable } from "@nestjs/common";
import type { IBookRepository } from "../../domain/repository/book.repository";

@Injectable()
export class FindByIdBookUseCase {
    constructor(
        @Inject('IBookRepository')
        private readonly bookRepo: IBookRepository
    ) {}

    execute(id: number){
        return this.bookRepo.findById(id);
    } 
}