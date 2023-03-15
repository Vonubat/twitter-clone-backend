import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1678888075315 implements MigrationInterface {
  name = 'Migration1678888075315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tweet" ADD "textAgain" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tweet" DROP COLUMN "textAgain"`);
  }
}
