
import { Book } from "src/modules/book/domain/entities/book.entity";
import { User } from "src/modules/users/domain/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity("loan")
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @Column()
  borrowerId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  borrowedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  dueAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  returnedAt?: Date;

  @ManyToOne(() => Book, (book) => book.loans, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "bookId" })
  book: Book;

  @ManyToOne(() => User, (user) => user.loans, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "borrowerId" })
  borrower: User;
}
