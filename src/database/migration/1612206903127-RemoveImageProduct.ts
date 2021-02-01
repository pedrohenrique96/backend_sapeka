import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveImageProduct1612206903127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'products',
      new TableColumn({
        name: 'imageName',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'imageName',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
