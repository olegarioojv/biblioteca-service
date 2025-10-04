import { Injectable } from "@nestjs/common";
import { Loan } from "../../domain/entities/loan.entity";
import { LoanService } from "../../domain/services/loan.service";

@Injectable()
export class CreateLoanUseCase {
  constructor(private readonly loanService: LoanService) {}

  async execute(bookId: number, borrowerId: number, dueAt?: Date): Promise<Loan> {
    return this.loanService.createLoan(bookId, borrowerId, dueAt);
  }
}
