import { Inject, Injectable } from "@nestjs/common";
import type { ILoanRepository } from "../../domain/repository/loan.repository";

@Injectable()
export class FindAllLoansUseCase {
  constructor(
    @Inject("ILoanRepository")
    private readonly loanRepo: ILoanRepository,
  ) {}

  async execute() {
    return this.loanRepo.findAll();
  }
}

