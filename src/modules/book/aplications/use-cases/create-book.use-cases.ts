import { Inject, Injectable } from "@nestjs/common";
import { Book } from "../../domain/entities/book.entity";
import type { IBookRepository } from "../../domain/repository/book.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookDto } from "../../infrastructure/controllers/dto/create-book.dto";

@Injectable()
export class CreateBookUseCase{
    constructor(
        @Inject("IBookRepository")
        private readonly bookRepo: IBookRepository,
    ) {}

    async execute(createBookDto: CreateBookDto): Promise<Book>{
        const book = new Book(createBookDto);

        const savedBook = await this.bookRepo.save(book);

        console.log("Livro Salvo: ", savedBook);

        return savedBook;
    }
}

@Injectable()
export class UserTypeOrmRepository implements IBookRepository {
    constructor(
        @InjectRepository(Book)
        private readonly typeOrmRepo: Repository<Book>,
    ) {}

    create(data: Partial<Book>): Book {
        return this.typeOrmRepo.create(data);
    }

    async save(user: Book): Promise<Book> {
        const result = await this.typeOrmRepo.save(user);
        return result;
    }

    async update(user: Book): Promise<Book> {
        await this.typeOrmRepo.update(user.id, user);
        return this.findById(user.id);
    }

    async remove(id: number): Promise<void> {
        await this.typeOrmRepo.delete(id);
    }

    findAll(): Promise<Book[]> {
        return this.typeOrmRepo.find();
    }

    findById(id: number): Promise<Book> {
        return this.typeOrmRepo.findOneOrFail({ where: { id } });
    }
}