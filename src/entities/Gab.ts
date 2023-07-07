import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Site } from "./Site";

@Entity()
export class Gab {
    @PrimaryColumn()
    id: string

    @Column()
    depth: number

    @Column()
    width: number

    @Column({ nullable: true })
    limitedRoll: string

    @Column({ nullable: true })
    planDepth: number

    @Column()
    date: Date
    
    @Column({ nullable: true })
    forecastDepth: number

    @Column({ nullable: true })
    forecastDate: Date

    @ManyToOne(type => Site)
    site: Site
}