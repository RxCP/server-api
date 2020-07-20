import { MigrationInterface, QueryRunner } from 'typeorm';

export class iniUserTable1594950510254 implements MigrationInterface {
  name = 'iniUserTable1594950510254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`created_at` datetime NULL, `updated_at` datetime NULL, `id` int UNSIGNED NOT NULL AUTO_INCREMENT, `email` varchar(32) NOT NULL, `password` varchar(255) NOT NULL, `first_name` varchar(32) NOT NULL, `last_name` varchar(32) NOT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `user`', undefined);
  }
}
