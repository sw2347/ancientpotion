/**
 * This file part of Eldritch Discord MMORPG System
 * 
 * Copyright (c) 2023 Medievalverse RP
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 *
 * @author                  Alimsah YILDIRIM <alimsahy@gmail.com>
 * @package                 Player
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * @category                Entity
 * @module                  House
 *  
*/
import { ListableGameEntity } from "game/entity/ListableGameEntity";
import { Player } from "game/entity/player/Player";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { HouseQuidditchTeam } from "./HouseQuidditchTeam";

@Entity({ name: 'houses' })
export class House extends ListableGameEntity
{
    /**
     * Gets or sets house professor
     * 
     * @public
     * @type {Promise<Player>}
     * 
    */
    @ManyToOne(() => Player, { lazy: true })
    @JoinColumn({ name: 'professor_id' })
    professor: Promise<Player>;

    /**
     * Gets or sets house president
     * 
     * @public
     * @type {Promise<Player>}
     * 
    */
    @ManyToOne(() => Player, { lazy: true })
    @JoinColumn({ name: 'president_id' })
    president: Promise<Player>;

    /**
     * Gets or sets house vice president
     * 
     * @public
     * @type {Promise<Player>}
     * 
    */
    @ManyToOne(() => Player, { lazy: true })
    @JoinColumn({ name: 'vice_president_id' })
    vicePresident: Promise<Player>;

    /**
     * Gets or sets all house players
     * 
     * @public
     * @returns {Promise<Player[]>}
     * 
    */
    @OneToMany(() => Player, player => player.house, { lazy: true })
    members: Promise<Player[]>;

    quidditch: HouseQuidditchTeam;

    /**
     * Gets or sets house point
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'point', type: 'integer', nullable: false, default: 0 })
    point: number;
    
    /**
     * Gets house president
     * 
     * @public
     * @async
     * @function getPresident
     * @returns {Promise<Player>}
     * 
    */
    public async getPresident(): Promise<Player>
    {
        return this.president;
    }

    /**
     * Gets house vice president
     * 
     * @public
     * @async
     * @function getVicePresident
     * @returns {Promise<Player>}
     * 
    */
    public async getVicePresident(): Promise<Player>
    {
        return this.vicePresident;
    }

    /**
     * Gets house professor
     * 
     * @public
     * @async
     * @function getProfessor
     * @returns {Promise<Player>}
     * 
    */
    public async getProfessor(): Promise<Player>
    {
        return await this.professor;
    }

    /**
     * Gets house members
     * 
     * @public
     * @async
     * @function getMembers
     * @returns {Promise<Player[]>}
     * 
    */
    public async getMembers(): Promise<Player[]>
    {
        return await this.members;
    }
}