import {
  MigrationInterface,
  QueryRunner,
  Table
} from 'typeorm';

export default class subCategories1609125473179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subcategories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subcategories');
  }
}
