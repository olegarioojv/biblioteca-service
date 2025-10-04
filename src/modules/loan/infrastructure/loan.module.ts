import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Loan } from "../domain/entities/loan.entity";
import { LoanController } from "./controllers/loan.controller";
import { LoanTypeOrmRepository } from "../domain/repository/loan.repository";
import { CreateLoanUseCase } from "../aplications/use-cases/create-loan.use-cases";
import { FindAllLoansUseCase } from "../aplications/use-cases/find-all-loands.use-case";
import { FindByIdLoanUseCase } from "../aplications/use-cases/find-by-id-loan.use-case";
import { ReturnLoanUseCase } from "../aplications/use-cases/return-loan.use-case";
import { RmqModule } from "../../shared/messaging/rmq.module";
import { BookModule } from "../../book/infrastructure/book.module";
import { UserModule } from "../../users/infrastructure/user.module";
import { LoanService } from "../domain/services/loan.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    RmqModule,
    BookModule,
    UserModule,
  ],
  controllers: [LoanController],
  providers: [
    LoanService,
    CreateLoanUseCase,
    FindAllLoansUseCase,
    FindByIdLoanUseCase,
    ReturnLoanUseCase,
    LoanTypeOrmRepository,
    {
      provide: "ILoanRepository",
      useExisting: LoanTypeOrmRepository,
    },
  ],
  exports: ["ILoanRepository"],
})
export class LoanModule {}
