import { Task } from "src/task/entities/task.entity";
import { Column, Entity, Exclusion, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}
