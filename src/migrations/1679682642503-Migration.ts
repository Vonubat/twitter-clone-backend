import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1679682642503 implements MigrationInterface {
  name = 'Migration1679682642503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "location" character varying NOT NULL, "avatar" character varying, "bgImage" character varying, "joined" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "like" ("likeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "tweetTweetId" uuid, "userUserId" uuid, CONSTRAINT "PK_c7fd8b37d71a1b2194841984084" PRIMARY KEY ("likeId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tweet" ("tweetId" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_e7fb403cff8a6a4613e1fbcdb66" PRIMARY KEY ("tweetId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "followers" ("userId" uuid NOT NULL, "followerId" uuid NOT NULL, CONSTRAINT "PK_ec7c44288deba8d4f1a945acfe5" PRIMARY KEY ("userId", "followerId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_d052aca09cecd2e9b8b94e3c67" ON "followers" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_451bb9eb792c3023a164cf14e0" ON "followers" ("followerId") `);
    await queryRunner.query(
      `CREATE TABLE "bannedUsers" ("userId" uuid NOT NULL, "bannedId" uuid NOT NULL, CONSTRAINT "PK_e866cf2ddc15abdb71fbd77d54c" PRIMARY KEY ("userId", "bannedId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_3ba06aa3983c2e6796d9bc6fe6" ON "bannedUsers" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_4f1c7e93dc3ce9924c060c50ca" ON "bannedUsers" ("bannedId") `);
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_f61dc588a5212f27ef7625d96bb" FOREIGN KEY ("tweetTweetId") REFERENCES "tweet"("tweetId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_9c8d745f61e58ab9be5f5bf44f4" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "FK_cf969c68c059892ffb0d883d73d" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a" FOREIGN KEY ("followerId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bannedUsers" ADD CONSTRAINT "FK_3ba06aa3983c2e6796d9bc6fe6a" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bannedUsers" ADD CONSTRAINT "FK_4f1c7e93dc3ce9924c060c50caa" FOREIGN KEY ("bannedId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bannedUsers" DROP CONSTRAINT "FK_4f1c7e93dc3ce9924c060c50caa"`);
    await queryRunner.query(`ALTER TABLE "bannedUsers" DROP CONSTRAINT "FK_3ba06aa3983c2e6796d9bc6fe6a"`);
    await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a"`);
    await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671"`);
    await queryRunner.query(`ALTER TABLE "tweet" DROP CONSTRAINT "FK_cf969c68c059892ffb0d883d73d"`);
    await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_9c8d745f61e58ab9be5f5bf44f4"`);
    await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_f61dc588a5212f27ef7625d96bb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4f1c7e93dc3ce9924c060c50ca"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3ba06aa3983c2e6796d9bc6fe6"`);
    await queryRunner.query(`DROP TABLE "bannedUsers"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_451bb9eb792c3023a164cf14e0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d052aca09cecd2e9b8b94e3c67"`);
    await queryRunner.query(`DROP TABLE "followers"`);
    await queryRunner.query(`DROP TABLE "tweet"`);
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
