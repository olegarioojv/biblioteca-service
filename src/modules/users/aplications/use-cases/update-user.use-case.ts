import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import { UpdateUserDto } from "../../infrastructure/controllers/dto/update-user.dto";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: number, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    Object.assign(user, updateDto);
    return this.userRepo.save(user);
  }
}
