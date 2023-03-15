import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migartion1678887807670 implements MigrationInterface {
  name = 'Migartion1678887807670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "followers" ("userId" uuid NOT NULL, "followerId" uuid NOT NULL, CONSTRAINT "PK_ec7c44288deba8d4f1a945acfe5" PRIMARY KEY ("userId", "followerId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_d052aca09cecd2e9b8b94e3c67" ON "followers" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_451bb9eb792c3023a164cf14e0" ON "followers" ("followerId") `);
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a" FOREIGN KEY ("followerId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a"`);
    await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_451bb9eb792c3023a164cf14e0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d052aca09cecd2e9b8b94e3c67"`);
    await queryRunner.query(`DROP TABLE "followers"`);
  }
}
