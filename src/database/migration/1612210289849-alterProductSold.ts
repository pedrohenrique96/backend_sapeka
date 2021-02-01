import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterProductSold1612210289849 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'sold',
        type: 'boolean',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'products',
      new TableColumn({
        name: 'sold',
        type: 'boolean',
        isNullable: false,
      }),
    );
  }
}
