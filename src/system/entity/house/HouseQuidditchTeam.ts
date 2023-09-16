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
 * @package                 House
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * @category                Entity
 * @module                  HouseQuidditchTeam
 *  
*/
import { Column, Entity } from "typeorm";
import { GameEntity } from "game/entity/GameEntity";
import { Player } from "game/entity/player/Player";

@Entity({ name: 'house_quidditch' })
export class HouseQuidditchTeam extends GameEntity
{
    /**
     * Gets or sets quidditch team wins
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'win', type: 'integer', nullable: false, default: 0 })
    win: number;

    /**
     * Gets or sets quidditch team loss
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'loss', type: 'integer', nullable: false, default: 0 })
    loss: number;

    /**
     * Gets or sets quidditch team draw
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'draw', type: 'integer', nullable: false, default: 0 })
    draw: number;

    /**
     * Gets or sets quidditch team captain
     * 
     * @public 
     * @type {Player}
     * 
    */
    captain: Player;

    /**
     * Gets or sets quidditch team players
     * 
     * @public
     * @type {Player[]}
     * 
    */
    players: Player[];
}