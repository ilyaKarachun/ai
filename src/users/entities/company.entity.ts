import { Column, Entity } from 'typeorm';

@Entity()
export class Company {
  @Column()
  name: string;

  @Column()
  catchPhrase: string;

  @Column()
  bs: string;
} 