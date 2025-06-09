import { Column, Entity } from 'typeorm';
import { Geo } from './geo.entity';

@Entity()
export class Address {
  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column(() => Geo)
  geo: Geo;
} 