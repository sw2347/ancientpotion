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
 * @package                 Discord Client manager
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * 
 *  
*/
import { Client, ClientOptions, Guild } from 'discord.js';
import { Player } from 'game/entity/player/Player';

export class Discord
{
    /**
     * Current discord client
     * 
     * @private
     * @static
     * @returns {Client}
     * 
    */
    private static m_discordClient: Client;

    private static m_activeInteractions: Map<Player, number>;

    /**
     * Gets current discord client
     * 
     * @public
     * @static
     * @returns {Client}
     * 
    */
    public static get client(): Client
    {
        return this.m_discordClient;
    }

    /**
     * Gets current guild information
     * 
     * @public
     * @static
     * @returns {Guild|undefined}
     * 
    */
    public static get guild(): Guild | undefined
    {
        return this.client.guilds.cache.get('');
    }

    public static get activeInteractions(): Map<Player, number>
    {
        return this.m_activeInteractions;
    }

    /**
     * Initializes discord client
     * 
     * @public
     * @static
     * @async
     * @function initialize
     * 
     * @param {ClientOptions} options                       Discord client options
     * 
     * @returns {Promise<void>}
     *  
    */
    public static async initialize(options: ClientOptions): Promise<void>
    {
        this.m_discordClient = new Client(options);
    }
}