import { Inject, Injectable } from "@nestjs/common";
import type { IBookRepository } from "../../domain/repository/book.repository";

@Injectable()
export class FindAllBookUseCase{
    constructor(
        @Inject('IBookRepository')
        private readonly bookRepo: IBookRepository
    ) {}

    execute() {
        return this.bookRepo.findAll();
    }
}