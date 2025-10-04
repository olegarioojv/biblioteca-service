import { Inject, Injectable } from "@nestjs/common";
import type { IUserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class RemoveUserUseCase{
    constructor(
        @Inject('IUserRepository')
        private userRepo: IUserRepository,
    ) {}

    execute(id: number){
        return this.userRepo.remove(id);
    }
}