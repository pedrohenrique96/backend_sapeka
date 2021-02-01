import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterColumnProductRemovePath1612183471667
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'products',
      new TableColumn({
        name: 'pathImage',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'pathImage',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
