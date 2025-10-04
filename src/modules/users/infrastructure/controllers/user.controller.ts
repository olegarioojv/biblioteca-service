import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { FindAllUserUseCase } from "../../aplications/use-cases/find-all-user.use-case";
import { FindByIdUserUseCase } from "../../aplications/use-cases/find-by-id-user.use-case";
import { CreateUserUseCase } from "../../aplications/use-cases/create-user.use-case";
import { UpdateUserUseCase } from "../../aplications/use-cases/update-user.use-case";
import { SetDeptoUserUseCase } from "../../aplications/use-cases/set-depto-user.use-case";
import { RemoveUserUseCase } from "../../aplications/use-cases/remove-ser.use-case";
import { UpdateDeptoUserDto } from "./dto/update-depto-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";



@Controller('users')
export class UserController {
  @Inject(FindAllUserUseCase)
  private readonly findAllUserUseCase: FindAllUserUseCase;

  @Inject(FindByIdUserUseCase)
  private readonly findByIdUserUseCase: FindByIdUserUseCase;

  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;

  @Inject(UpdateUserUseCase)
  private readonly updateUserUseCase: UpdateUserUseCase;

  @Inject(SetDeptoUserUseCase)
  private readonly setDeptoUserUseCase: SetDeptoUserUseCase;

  @Inject(RemoveUserUseCase)
  private readonly removeUserUseCase: RemoveUserUseCase;

  @Get()
  findAll() {
    return this.findAllUserUseCase.execute();
  }
  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findByIdUserUseCase.execute(id);
  }

  @Patch(':id/depto')
  async updateDepto(@Param('id') id: number, @Body() UpdateDeptoUserDto: UpdateDeptoUserDto) {
    return this.setDeptoUserUseCase.execute(id, UpdateDeptoUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.removeUserUseCase.execute(id);
  }
}