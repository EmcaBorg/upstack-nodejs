import { Entity, PrimaryGeneratedColumn, Column, EntityRepository, Repository, ManyToOne } from 'typeorm';
import { Role } from './roles';

@Entity({name: 'employees'})
export class Employee {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({unique: true})
    name: string;

  @Column({unique: true})
    email: string;
    
  @Column({unique: true})
    username: string; 

  @ManyToOne(() => Role, role => role.employees)
    role: Role;  

}

@EntityRepository(Employee)
export class EmployeesRepository extends Repository<Employee> {}