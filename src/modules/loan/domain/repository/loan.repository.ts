import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Loan } from "src/modules/loan/domain/entities/loan.entity";

export interface ILoanRepository {
  create(data: Partial<Loan>): Loan;
  save(loan: Loan): Promise<Loan>;
  update(loan: Loan): Promise<Loan>;
  remove(id: number): Promise<void>;
  findAll(): Promise<Loan[]>;
  findById(id: number): Promise<Loan>;
}

@Injectable()
export class LoanTypeOrmRepository implements ILoanRepository {
  constructor(
    @InjectRepository(Loan)
    private readonly typeOrmRepo: Repository<Loan>,
  ) {}

  create(data: Partial<Loan>): Loan {
    return this.typeOrmRepo.create(data);
  }

  async save(loan: Loan): Promise<Loan> {
    return this.typeOrmRepo.save(loan);
  }

  async update(loan: Loan): Promise<Loan> {
    await this.typeOrmRepo.update(loan.id, loan);
    return this.findById(loan.id);
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }

  findAll(): Promise<Loan[]> {
    return this.typeOrmRepo.find();
  }

  findById(id: number): Promise<Loan> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
}
