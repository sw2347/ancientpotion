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
 * @package                 Account
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * @module                  Account
 *  
*/
import { Entity, Column, OneToMany } from 'typeorm';
import { GuildMember, Presence } from 'discord.js';
import { AccountStatus } from "./AccountStatus";
import { GameEntity } from "../GameEntity";
import { Discord } from '../../common/Discord';
import { Player } from '../player/Player';

@Entity({ name: 'accounts' })
export class Account extends GameEntity
{
    /**
     * Gets or sets discord identifier
     * 
     * @public
     * @type {string}
     * 
    */
    @Column({ name: 'user', type: 'varchar', nullable: false, comment: 'Unique discord user identifier' })
    user: string;

    /**
     * Gets or sets account status
     * 
     * @public
     * @type {AccountStatus}
     * 
    */
    @Column({ name: 'status', type: 'enum', enum: AccountStatus, nullable: false, default: AccountStatus.Active })
    status: AccountStatus;

    /**
     * Gets or sets account players
     * 
     * @type {Promise<Player[]>}
     * 
    */
    @OneToMany(() => Player, player => player.account, { lazy: true })
    players: Promise<Player[]>;

    /**
     * Gets account's discord user informations
     * 
     * @public
     * @async
     * @function getUser
     * @returns {Promise<GuildMember|undefined>}
     * 
    */
    public getUser(): GuildMember | undefined
    {
        return Discord.guild?.members.cache.get(this.user);
    }

    
}

let player = new Player();
player