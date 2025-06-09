import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class Geo {
  @Column({ type: 'text' })
  lat: string;

  @Column({ type: 'text' })
  lng: string;
}

class Address {
  @Column({ type: 'text' })
  street: string;

  @Column({ type: 'text' })
  suite: string;

  @Column({ type: 'text' })
  city: string;

  @Column({ type: 'text' })
  zipcode: string;

  @Column(() => Geo)
  geo: Geo;
}

class Company {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  catchPhrase: string;

  @Column({ type: 'text' })
  bs: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  email: string;

  @Column(() => Address)
  address: Address;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  website: string;

  @Column(() => Company)
  company: Company;
} 