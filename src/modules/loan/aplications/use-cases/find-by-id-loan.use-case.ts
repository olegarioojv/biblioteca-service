import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import type { ILoanRepository } from "../../domain/repository/loan.repository";
import { Loan } from "../../domain/entities/loan.entity";

@Injectable()
export class FindByIdLoanUseCase {
  constructor(
    @Inject("ILoanRepository")
    private readonly loanRepo: ILoanRepository,
  ) {}

  async execute(id: number): Promise<Loan> {
    const loan = await this.loanRepo.findById(id);
    if (!loan) {
      throw new NotFoundException(`Empréstimo com id ${id} não encontrado`);
    }
    return loan;
  }
}
