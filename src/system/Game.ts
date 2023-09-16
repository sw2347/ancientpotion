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
 * @package                 General Game management
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * 
 *  
*/
import { GameEventEmitter } from "game/GameEventEmitter";
import { GameState } from "game/GameState";
import { Database } from "game/common/Database";
import { InvalidGameState } from "game/exception/InvalidGameState";

export class Game 
{
    /**
     * Main game event listener/emitter
     * þ
     * @private
     * @static
     * @type {GameEventEmitter}
     * 
    */
    private static m_eventCom: GameEventEmitter;

    /**
     * Current game state object
     * 
     * @private
     * @static
     * @type {GameState}
     * 
    */
    private static m_state: GameState;

    /**
     * Gets current game state
     * 
     * @public
     * @static
     * @returns {GameState}
     * 
    */
    public static get state(): GameState
    {
        return this.m_state;
    }

    /**
     * Current game event emitter/listener
     * 
     * @public
     * @static
     * @returns {GameEventEmitter}
     * 
    */
    public static get event(): GameEventEmitter
    {
        return this.m_eventCom;
    }

    /**
     * Gets current database connection
     * 
     * @public
     * @static
     * @returns {Database}
     * 
    */
    public static get database(): typeof Database
    {
        return Database;
    }

    /**
     * Initializes all game
     * 
     * @public
     * @static
     * @async
     * @function initialize
     * @returns {Promise<void>}
     * 
    */
    public static async initialize(): Promise<void>
    {
        this.m_eventCom = new GameEventEmitter();
        this.event.emit('gameReady');
        return Promise.resolve();
    }

    /**
     * Sets game current state
     * 
     * - This changes can effect features/modules
     * 
     * @public
     * @static
     * @async
     * @function setState
     * 
     * @param {GameState} state                 New game state
     * 
     * @returns {void}
     *  
    */
    public static async setState(state: GameState): Promise<void>
    {
        let oldState = this.state;
        switch (state)
        {
            case GameState.Running:
            case GameState.Closed:
            case GameState.Suspended:
            {
                this.m_state = state;
                break;
            }
            default:
            {
                throw new InvalidGameState(InvalidGameState.UNSUPPORTED_STATE);
            }
        }
        this.event.emit('gameStateChanged', oldState, state);
        return Promise.resolve();
    }
}