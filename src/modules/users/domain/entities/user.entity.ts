import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Loan } from "src/modules/loan/domain/entities/loan.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum RoleUser {
  Admin = 'administrador',
  User = 'usuário',
}

export enum DeptoUser {
  ES = 'Estudante',
  PR = 'Professor',
  DI = 'Diretor',
  CO = 'Coordenador',
}

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  phone: string

  @Column({nullable: true})
  socialnetwork: string;

  @Column({ type: 'enum', enum: RoleUser, default: RoleUser.User })
  role: RoleUser;

  @Column({ type: 'enum', enum: DeptoUser, default: DeptoUser.ES })
  depto: DeptoUser;

  @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToMany(() => Loan, (loan) => loan.borrower)
  loans: Loan[];


  constructor(
    props?: {
      name: string;
      email: string;
      password: string;
      phone?: string | null;
      socialnetwork?: string | null;
    },
  ) {
    if (props) {
      Object.assign(this, props);
    }
  }


  verifyUser(user: User): void{
    if (!user){
      throw new NotFoundException('Usuário não encontrado!')
    }
  }

  updateDepto(depto: DeptoUser): void {
    if (!Object.values(DeptoUser).includes(depto as DeptoUser)) {
      throw new BadRequestException(
        `Departamento inválido. Valores permitidos: ${Object.values(DeptoUser).join(', ')}`,
      );
    }
    this.depto = depto;
  }

  updateRole(role: RoleUser): void {
    if (!Object.values(RoleUser).includes(role as RoleUser)) {
      throw new BadRequestException(
        `Role inválida. Valores permitidos: ${Object.values(RoleUser).join(', ')}`,
      );
    }

    if (this.role === RoleUser.User) {
      throw new BadRequestException("Você não tem permissão para alterar!");
    }

    this.role = role;
  }
}
