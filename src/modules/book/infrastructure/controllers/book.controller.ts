import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { FindAllBookUseCase } from "../../aplications/use-cases/find-all-book.use-case";
import { FindByIdBookUseCase } from "../../aplications/use-cases/find-by-id.use-case";
import { CreateBookUseCase } from "../../aplications/use-cases/create-book.use-cases";
import { RemoveBookUseCase } from "../../aplications/use-cases/remove-book.use-case";
import { UpdateBookDto } from "./dto/update-book.dto";
import { UpdateBookUseCase } from "../../aplications/use-cases/update-book.use-cases";
import { CreateBookDto } from "./dto/create-book.dto";

@Controller('book')
    export class BookController{
        @Inject(FindAllBookUseCase)
        private readonly findAllBookUseCase: FindAllBookUseCase;

        @Inject(FindByIdBookUseCase)
        private readonly findByIdBookUseCase: FindByIdBookUseCase;

        @Inject(CreateBookUseCase)
        private readonly createBookUseCase: CreateBookUseCase;

        @Inject(RemoveBookUseCase)
        private readonly removeBookUseCase: RemoveBookUseCase;

        @Inject(UpdateBookUseCase)
        private readonly updateBookUseCase: UpdateBookUseCase

        @Get()
        findAll(){
            return this.findAllBookUseCase.execute();
        }

        @Get(":id")
        findOne(@Param('id') id: number){
            return this.findByIdBookUseCase.execute(id);
        }

        @Patch(":id")
        async update(
            @Param('id') id: number,
            @Body() UpdateBookDto: UpdateBookDto
        ){
            return this.updateBookUseCase.execute(id, UpdateBookDto)
        }

        @Post()
        create(@Body() createBookDto: CreateBookDto){
            return this.createBookUseCase.execute(createBookDto)
        }

        @Delete(':id')
        remove(@Param('id') id: number){
            return this.removeBookUseCase.execute(id)
        }
    }