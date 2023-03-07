import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migartion1677766976253 implements MigrationInterface {
  name = 'Migartion1677766976253';

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
      `ALTER TABLE "like" ADD CONSTRAINT "FK_f61dc588a5212f27ef7625d96bb" FOREIGN KEY ("tweetTweetId") REFERENCES "tweet"("tweetId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_9c8d745f61e58ab9be5f5bf44f4" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tweet" ADD CONSTRAINT "FK_cf969c68c059892ffb0d883d73d" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tweet" DROP CONSTRAINT "FK_cf969c68c059892ffb0d883d73d"`);
    await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_9c8d745f61e58ab9be5f5bf44f4"`);
    await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_f61dc588a5212f27ef7625d96bb"`);
    await queryRunner.query(`DROP TABLE "tweet"`);
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
