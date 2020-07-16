import { MigrationInterface, QueryRunner } from 'typeorm';

export class userInitTable1594867784695 implements MigrationInterface {
  name = 'userInitTable1594867784695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `page` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, UNIQUE INDEX `IDX_6eb7269e2ff9f7d06893acebf1` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `user`', undefined);
    await queryRunner.query(
      'DROP INDEX `IDX_6eb7269e2ff9f7d06893acebf1` ON `page`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `page`', undefined);
  }
}
