import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(data: Partial<User>): User;       
    save(user: User): Promise<User>;          
    update(user: User): Promise<User>;       
    remove(id: number): Promise<void>;        
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>; 
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly typeOrmRepo: Repository<User>,
    ) {}

    create(data: Partial<User>): User {
        return this.typeOrmRepo.create(data);
    }

    async save(user: User): Promise<User> {
        const result = await this.typeOrmRepo.save(user);
        return result;
    }

    async update(user: User): Promise<User> {
        await this.typeOrmRepo.update(user.id, user);
        return this.findById(user.id);
    }

    async remove(id: number): Promise<void> {
        await this.typeOrmRepo.delete(id);
    }

    findAll(): Promise<User[]> {
        return this.typeOrmRepo.find();
    }

    findById(id: number): Promise<User> {
        return this.typeOrmRepo.findOneOrFail({ where: { id } });
    }
}
 