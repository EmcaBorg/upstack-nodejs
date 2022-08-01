import { Entity, PrimaryGeneratedColumn, Column, EntityRepository, Repository, OneToMany } from 'typeorm';
import { Employee } from './employees';

@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({unique: true})
    role_code: string;
    
  @Column({unique: true})
    role_name: string;  

  @OneToMany(() => Employee, employee => employee.role)
    employees: Employee[];  

}

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {}