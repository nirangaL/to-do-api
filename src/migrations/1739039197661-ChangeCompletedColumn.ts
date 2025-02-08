import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCompletedColumn1739039197661 implements MigrationInterface {
    name = 'ChangeCompletedColumn1739039197661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "completed" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "completed" boolean NOT NULL DEFAULT false`);
    }

}
