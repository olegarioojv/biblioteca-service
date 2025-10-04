import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import type { ILoanRepository } from "../repository/loan.repository";
import type { IBookRepository } from "src/modules/book/domain/repository/book.repository";
import type { IUserRepository } from "src/modules/users/domain/repositories/user.repository";
import { Loan } from "../entities/loan.entity";

@Injectable()
export class LoanService {
  constructor(
    @Inject("ILoanRepository")
    private readonly loanRepo: ILoanRepository,

    @Inject("IBookRepository")
    private readonly bookRepo: IBookRepository,

    @Inject("IUserRepository")
    private readonly userRepo: IUserRepository,

    @Inject("MAIL_SERVICE")
    private readonly mailClient: ClientProxy
  ) {}

  async createLoan(bookId: number, borrowerId: number, dueAt?: Date): Promise<Loan> {
    const book = await this.bookRepo.findById(bookId);
    if (!book.available) {
      throw new BadRequestException("Este livro não está disponível para empréstimo");
    }

    const user = await this.userRepo.findById(borrowerId);

    const loan = this.loanRepo.create({ bookId, borrowerId, dueAt });
    const saved = await this.loanRepo.save(loan);

    book.available = false;
    await this.bookRepo.save(book);

    await this.mailClient.connect();

    this.mailClient.emit("loan.created", {
      id: saved.id,
      name: user.name,
      email: user.email,
      bookTitle: book.title,
    });

    console.log("Evento loan.created emitido:", {
      id: saved.id,
      name: user.name,
      email: user.email,
      bookTitle: book.title,
    });

    return saved;
  }
}
