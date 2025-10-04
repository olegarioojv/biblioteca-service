import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import type { ILoanRepository } from "../../domain/repository/loan.repository";
import type { IBookRepository } from "src/modules/book/domain/repository/book.repository";
import { Loan } from "../../domain/entities/loan.entity";

@Injectable()
export class ReturnLoanUseCase {
  constructor(
    @Inject("ILoanRepository")
    private readonly loanRepo: ILoanRepository,

    @Inject("IBookRepository")
    private readonly bookRepo: IBookRepository,
  ) {}

  async execute(id: number): Promise<Loan> {
    const loan = await this.loanRepo.findById(id);
    if (!loan) {
      throw new NotFoundException("Empréstimo não encontrado");
    }

    loan.returnedAt = new Date();
    const updated = await this.loanRepo.update(loan);

    const book = await this.bookRepo.findById(loan.bookId);
    book.available = true;
    await this.bookRepo.save(book);

    return updated;
  }
}
