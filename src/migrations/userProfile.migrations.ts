import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserProfile1705657012547 implements MigrationInterface {
  name = "CreateUserProfile1705657012547";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE user_profile (
                id INT NOT NULL AUTO_INCREMENT,
                user_id VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                carrots INT NOT NULL,
                PRIMARY KEY (id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE user_profile");
  }
}
