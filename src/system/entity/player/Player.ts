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
 * @module                  Player 
 * 
*/
import { ClientPresenceStatusData, Presence } from "discord.js";
import { Column, Entity, JoinColumn, ManyToOne, RemoveOptions, SaveOptions } from "typeorm";
import { Game } from "game/Game";
import { GameEntity } from "game/entity/GameEntity";
import { Account } from "game/entity/account/Account";
import { House } from "../house/House";
import { Redis } from "game/common/Redis";
import { Discord } from "game/common/Discord";


@Entity({ name: 'players' })
export class Player extends GameEntity
{
    /**
     * Gets or sets player's name
     * 
     * @public
     * @type {string}
     * 
    */
    @Column({ name: 'player_name', type: 'varchar', nullable: false })
    name: string;

    /**
     * Gets or sets player's surname
     * 
     * @public
     * @type {string}
     * 
    */
    @Column({ name: 'player_surname', type: 'varchar', nullable: false })
    surname: string;

    /**
     * Gets or sets player's level
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'level', type: 'integer', nullable: false, default: 1 })
    level: number;

    /**
     * Gets or sets player's experience
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'exp', type: 'integer', nullable: false, default: 0 })
    experience: number;

    /**
     * Gets or sets player's gold amount
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'gold', type: 'integer', nullable: false, default: 0 })
    gold: number;

    /**
     * Gets or sets player's money amount
     * 
     * @public
     * @type {null}
     * 
    */
    @Column({ name: 'money', type: 'integer', nullable: false, default: 0 })
    money: number;

    /**
     * Gets or sets player's health
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'health', type: 'integer', nullable: false, default: 100 })
    health: number;

    /**
     * Gets or sets player's armour
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'armour', type: 'integer', nullable: false, default: 0 })
    armour: number;

    /**
     * Gets or sets player's mana point
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'mana', type: 'integer', nullable: false, default: 100 })
    mana: number;

    /**
     * Gets or sets related account
     * 
     * @public
     * @type {Account}
     * 
    */
    @ManyToOne(() => Account, account => account.players, { eager: true })
    @JoinColumn({ name: 'account_id' })
    account: Account;

    /**
     * Gets or sets player's house
     * 
     * @public
     * @type {House}
     * 
    */
    @ManyToOne(() => House, house => house.members, { eager: true })
    @JoinColumn({ name: 'house_id' })
    house: House;

    /**
     * Gets or sets related account id
     * 
     * @public
     * @type {number}
     * 
    */
    @Column({ name: 'account_id', type: 'integer', nullable: false })
    accountId: number;

    /**
     * Saves current entity in the database. If entity does not exist in the database then inserts, otherwise updates
     * 
     * @override
     * @param {SaveOptions | undefined} options 
     * @returns {Promise<this>}
     * 
    */
    public async save(options?: SaveOptions | undefined): Promise<this> 
    {
        let current = this; // current player
        let updatedPlayer = await super.save(options);
        Game.event.emit('playerUpdated', { oldPlayer: current, newPlayer: updatedPlayer, timestamp: Date.now() });
        return updatedPlayer;
    }

    /**
     * Removes current entity from the database.
     * 
     * @override
     * @param {RemoveOptions | undefined} options 
     * @returns {Promise<this>}
     * 
    */
    public async remove(options?: RemoveOptions | undefined): Promise<this> 
    {
        Game.event.emit('playerDeleted', { player: this, timestamp: Date.now() });
        return super.remove(options);
    }

    /**
     * Determines is player currently in voice channel or not
     * 
     * @public
     * @function isInVoiceChannel
     * @returns {boolean}
     * 
    */
    public isInVoiceChannel(): boolean
    {
        return this.account.getUser()?.voice.channelId !== null;
    }

    /**
     * Determines is player self-muted or not
     * 
     * @public
     * @function isMuted
     * @returns {boolean | null | undefined}
     * 
    */
    public isMuted(): boolean | null | undefined
    {
        return this.account.getUser()?.voice.selfMute;
    }

    /**
     * Determines is player muted by server (by moderator) or not
     * 
     * @public
     * @function isServerMuted
     * @returns {boolean | null | undefined}
     * 
    */
    public isServerMuted(): boolean | null | undefined
    {
        return this.account.getUser()?.voice.serverMute;
    }

    /**
     * Gets player's current presence
     * 
     * @public
     * @function getPresence
     * @returns {Presence | null | undefined}
     * 
    */
    public getPresence(): Presence | null | undefined
    {
        return this.account.getUser()?.presence;
    }

    /**
     * Gets player's playerform informations
     * 
     * @public
     * @function getPlatfom
     * @returns {ClientPresenceStatusData | null | undefined}
     * 
    */
    public getPlatfom(): ClientPresenceStatusData | null | undefined
    {
        return this.getPresence()?.clientStatus;
    }

    /**
     * Determines is player quidditch player or not
     * 
     * @public
     * @function isQuidditchPlayer
     * @returns {boolean}
     * 
    */
    public isQuidditchPlayer(): boolean { return false; }
    
    /**
     * Determines is player quidditch captain or not
     * 
     * @public
     * @function isQuidditchCaptain
     * @returns {boolean}
     * 
    */
    public isQuidditchCaptain(): boolean { return false; }

    /**
     * Determines is player house professor or not
     * 
     * @public
     * @async
     * @function isHouseProfessor
     * @returns {Promise<boolean>}
     * 
    */
    public async isHouseProfessor(): Promise<boolean> 
    { 
        return Promise.resolve((await this.house.getProfessor()).id === this.id);
    }

    /**
     * Determines is player house chairman or not
     * 
     * @public
     * @async
     * @function isHouseChairman
     * @returns {Promise<boolean>}
     * 
    */
    public async isHouseChairman(): Promise<boolean> 
    { 
        return Promise.resolve((await this.house.getPresident()).id === this.id);
    }

    /**
     * Determines is player house vice-chairman or not
     * 
     * @public
     * @async
     * @function isHouseViceChairman
     * @returns {Promise<boolean>}
     * 
    */
    public async isHouseViceChairman(): Promise<boolean> 
    { 
        return Promise.resolve((await this.house.getVicePresident()).id === this.id); 
    }

    /**
     * Increase player's determined attributes
     * 
     * @public
     * @async
     * @function increase
     * 
     * @param {'money'|'level'|'gold'|'exp'} attribute              Player attribute to increase
     * @param {number} amount                                       Attribute increase amount
     * 
     * @returns {Promise<void>}
     *  
    */
    public async increase(attribute: 'money' | 'level' | 'gold' | 'exp', amount: number = 1): Promise<void>
    {
        if (amount <= 0) return Promise.resolve();

        if (attribute === 'exp') this.experience += amount;
        if (attribute === 'gold') this.gold += amount;
        if (attribute === 'level') this.level += amount;
        if (attribute === 'money') this.money += amount;
        await this.save();
        return Promise.resolve();
    } 

    /**
     * Checks is player has an active uncompleted interaction
     * 
     * @public
     * @function hasActiveInteraction
     * @returns {boolean}
     * 
    */
    public hasActiveInteraction(): boolean
    {
        return Discord.activeInteractions.has(this);
    }
}

(async () =>
{
    let player = new Player();
    if (player.isQuidditchPlayer() || player.isQuidditchCaptain())
    {
        let president = (await player.house.getPresident()).account.getUser();
        let vicePresident = (await player.house.getVicePresident()).account.getUser();
        console.log(`Please contact with your house president ${president} or vice-president ${vicePresident}`);
    }
})