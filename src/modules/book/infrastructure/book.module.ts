import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../domain/entities/book.entity";
import { BookController } from "./controllers/book.controller";
import { CreateBookUseCase } from "../aplications/use-cases/create-book.use-cases";
import { FindAllBookUseCase } from "../aplications/use-cases/find-all-book.use-case";
import { FindByIdBookUseCase } from "../aplications/use-cases/find-by-id.use-case";
import { RemoveBookUseCase } from "../aplications/use-cases/remove-book.use-case";
import { UpdateBookUseCase } from "../aplications/use-cases/update-book.use-cases";
import { BookTypeOrmRepository } from "../domain/repository/book.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [
    CreateBookUseCase,
    FindAllBookUseCase,
    FindByIdBookUseCase,
    RemoveBookUseCase,
    UpdateBookUseCase,
    {
      provide: "IBookRepository",         
      useClass: BookTypeOrmRepository,    
    },
  ],
  exports: ["IBookRepository"],         
})
export class BookModule {}

