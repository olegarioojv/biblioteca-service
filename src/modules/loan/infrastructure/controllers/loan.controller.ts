import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { CreateLoanUseCase } from "../../aplications/use-cases/create-loan.use-cases";
import { FindAllLoansUseCase } from "../../aplications/use-cases/find-all-loands.use-case";
import { FindByIdLoanUseCase } from "../../aplications/use-cases/find-by-id-loan.use-case";
import { ReturnLoanUseCase } from "../../aplications/use-cases/return-loan.use-case";


@Controller("loan")
export class LoanController {
  @Inject(CreateLoanUseCase)
  private readonly createLoanUseCase: CreateLoanUseCase;

  @Inject(FindAllLoansUseCase)
  private readonly findAllLoansUseCase: FindAllLoansUseCase;

  @Inject(FindByIdLoanUseCase)
  private readonly findByIdLoanUseCase: FindByIdLoanUseCase;

  @Inject(ReturnLoanUseCase)
  private readonly returnLoanUseCase: ReturnLoanUseCase;

  @Post()
  create(@Body() body: { bookId: number; borrowerId: number; dueAt?: Date }) {
  return this.createLoanUseCase.execute(body.bookId, body.borrowerId, body.dueAt);
  }

  @Get()
  async findAll() {
    return this.findAllLoansUseCase.execute();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.findByIdLoanUseCase.execute(id);
  }

  @Patch(":id/return")
  async returnBook(@Param("id") id: number) {
    return this.returnLoanUseCase.execute(id);
  }

}
