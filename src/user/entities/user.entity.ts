import { ApiProperty } from "@nestjs/swagger";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}
