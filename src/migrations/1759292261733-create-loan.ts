import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoan1759292261733 implements MigrationInterface {
    name = 'CreateLoan1759292261733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`socialnetwork\` varchar(255) NULL, \`role\` enum ('administrador', 'usuário') NOT NULL DEFAULT 'usuário', \`depto\` enum ('Estudante', 'Professor', 'Diretor', 'Coordenador') NOT NULL DEFAULT 'Estudante', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`loan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bookId\` int NOT NULL, \`borrowerId\` int NOT NULL, \`borrowedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dueAt\` timestamp NULL, \`returnedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`available\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_1465982ea6993042a656754f4cc\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_fff5adf4a8082e21349521e6d3c\` FOREIGN KEY (\`borrowerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_fff5adf4a8082e21349521e6d3c\``);
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_1465982ea6993042a656754f4cc\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`loan\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
