import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCalumnImage1609390414777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'image');
    await queryRunner.dropColumn('products', 'price');

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'pathImage',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'imageName',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'price',
        type: 'float',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'pathImage');
    await queryRunner.dropColumn('products', 'imageName');
    await queryRunner.dropColumn('products', 'price');

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'price',
        type: 'numeric',
        isNullable: true,
      }),
    );
  }
}
