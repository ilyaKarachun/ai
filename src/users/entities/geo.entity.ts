import { Column, Entity } from 'typeorm';

@Entity()
export class Geo {
  @Column()
  lat: string;

  @Column()
  lng: string;
}
