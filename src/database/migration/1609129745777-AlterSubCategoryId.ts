import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AlterSubCategoryId1609129745777
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subcategories',
      new TableColumn({
        name: 'category_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'subcategories',
      new TableForeignKey({
        name: 'categoriesId',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('categories', 'categoriesId');
    await queryRunner.dropColumn('subcategories', 'category_id');
  }
}
