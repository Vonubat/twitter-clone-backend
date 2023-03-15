import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1678888528783 implements MigrationInterface {
  name = 'Migration1678888528783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tweet" DROP COLUMN "textAgain"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tweet" ADD "textAgain" character varying NOT NULL`);
  }
}
