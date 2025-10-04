import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../domain/entities/user.entity";
import { UserTypeOrmRepository } from "../domain/repositories/user.repository";
import { CreateUserUseCase } from "../aplications/use-cases/create-user.use-case";
import { FindAllUserUseCase } from "../aplications/use-cases/find-all-user.use-case";
import { FindByIdUserUseCase } from "../aplications/use-cases/find-by-id-user.use-case";
import { RemoveUserUseCase } from "../aplications/use-cases/remove-ser.use-case";
import { SetDeptoUserUseCase } from "../aplications/use-cases/set-depto-user.use-case";
import { UpdateUserUseCase } from "../aplications/use-cases/update-user.use-case";
import { UserController } from "./controllers/user.controller";
import { UserService } from "../domain/services/user.service";
import { RmqModule } from "../../shared/messaging/rmq.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    RmqModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        CreateUserUseCase,
        FindAllUserUseCase,
        FindByIdUserUseCase,
        RemoveUserUseCase,
        SetDeptoUserUseCase,
        UpdateUserUseCase,
        UserTypeOrmRepository,
        {
            provide: "IUserRepository",
            useExisting: UserTypeOrmRepository,
        },
    ],
    exports: ["IUserRepository"]
})
export class UserModule {}