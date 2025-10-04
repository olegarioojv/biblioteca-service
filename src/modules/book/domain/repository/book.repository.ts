import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "../entities/book.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

export interface IBookRepository {
    create(data: Partial<Book>): Book;       
    save(book: Book): Promise<Book>;          
    update(book: Book): Promise<Book>;       
    remove(id: number): Promise<void>;        
    findAll(): Promise<Book[]>;
    findById(id: number): Promise<Book>; 
}

@Injectable()
export class BookTypeOrmRepository implements IBookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly typeOrmRepo: Repository<Book>,
  ) {}

  create(data: Partial<Book>): Book {
    return this.typeOrmRepo.create(data);
  }

  save(book: Book): Promise<Book> {
    return this.typeOrmRepo.save(book);
  }

  async update(book: Book): Promise<Book> {
    await this.typeOrmRepo.update(book.id, book);
    return this.findById(book.id);
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