import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IBookRepository } from "../../domain/repository/book.repository";
import { UpdateBookDto } from "../../infrastructure/controllers/dto/update-book.dto";
import { Book } from "../../domain/entities/book.entity";

@Injectable()
export class UpdateBookUseCase {
    constructor(
        @Inject("IBookRepository")
        private readonly bookRepo: IBookRepository
    ) {}

    async execute(id: number, updatebookDto: UpdateBookDto): Promise<Book>{
        const book = await this.bookRepo.findById(id);
        if(!book){
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`)
        }
        
        Object.assign(book, updatebookDto)
        return this.bookRepo.save(book)
    }
}