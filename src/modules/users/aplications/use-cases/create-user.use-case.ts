import { Injectable } from "@nestjs/common";
import { UserService } from "../../domain/services/user.service";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(data: any): Promise<User> {
    return this.userService.createUser(data);
  }
}
