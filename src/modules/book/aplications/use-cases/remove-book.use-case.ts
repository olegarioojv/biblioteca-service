import { Inject, Injectable } from "@nestjs/common";
import type { IBookRepository } from "../../domain/repository/book.repository";

@Injectable()
export class RemoveBookUseCase{
    constructor(
        @Inject('IBookRepository')
        private bookRepo: IBookRepository
    ) {}

    execute(id: number){
        return this.bookRepo.remove(id);
    }
}