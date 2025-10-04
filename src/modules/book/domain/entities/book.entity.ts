import { NotFoundException } from "@nestjs/common";
import { Loan } from "src/modules/loan/domain/entities/loan.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("book")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column({ default: true })
  available: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @OneToMany(() => Loan, (loan) => loan.book)
  loans: Loan[];



  constructor(
    props?: {
      title: string;
      author: string;
      category: string;
      available?: boolean;
    },
  ) {
    if (props) {
      Object.assign(this, props);
    }
  }

  verifyBook(book: Book): void {
    if (!book) {
      throw new NotFoundException("Livro não encontrado!");
    }
  }
}

