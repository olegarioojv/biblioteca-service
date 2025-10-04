import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import type { IUserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepo: IUserRepository,

    @Inject("MAIL_SERVICE")
    private readonly mailClient: ClientProxy
  ) {}

  async createUser(userData: any): Promise<User> {
    const user = await this.userRepo.save(
      this.userRepo.create(userData)
    );

    await this.mailClient.connect();

    this.mailClient.emit("user.created", {
      id: user.id,
      name: user.name,
      email: user.email,
    });

    console.log("Evento user.created emitido:", {
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return user;
  }
}
