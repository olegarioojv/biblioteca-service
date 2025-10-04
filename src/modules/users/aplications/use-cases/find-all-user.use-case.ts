import { Inject, Injectable } from "@nestjs/common";
import type { IUserRepository } from "../../domain/repositories/user.repository";


@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  execute() {
    return this.userRepo.findAll();
  }
}
