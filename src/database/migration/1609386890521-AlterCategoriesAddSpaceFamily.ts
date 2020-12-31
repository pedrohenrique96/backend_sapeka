import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCategoriesAddSpaceFamily1609386890521
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'categories',
      new TableColumn({
        name: 'kidsOrManOrWoman',
        type: 'enum',
        enum: ['Masculino', 'Feminino', 'Kids'],
        isNullable: true
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('categories', 'kidsOrManOrWoman');
  }
}
