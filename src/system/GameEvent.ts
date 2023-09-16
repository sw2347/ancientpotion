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
 * @package                 General game event emitter
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * 
 *  
*/
import { GameEventMap } from "game/GameEventMap";

export interface GameEvent<TGameEvent extends GameEventMap>
{
    addListener<E extends keyof TGameEvent> (event: E, listener: TGameEvent[E]): this
    on<E extends keyof TGameEvent> (event: E, listener: TGameEvent[E]): this
    once<E extends keyof TGameEvent> (event: E, listener: TGameEvent[E]): this
    prependListener<E extends keyof TGameEvent> (event: E, listener: TGameEvent[E]): this
    prependOnceListener<E extends keyof TGameEvent> (event: E, listener: TGameEvent[E]): this
  
    off<E extends keyof TGameEvent>(event: E, listener: TGameEvent[E]): this
    removeAllListeners<E extends keyof TGameEvent> (event?: E): this
    removeListener<E extends keyof TGameEvent> (event: E, listener: TGameEvent[E]): this
  
    emit<E extends keyof TGameEvent> (event: E, ...args: Parameters<TGameEvent[E]>): boolean
    eventNames (): (keyof TGameEvent | string | symbol)[]
    rawListeners<E extends keyof TGameEvent> (event: E): TGameEvent[E][]
    listeners<E extends keyof TGameEvent> (event: E): TGameEvent[E][]
    listenerCount<E extends keyof TGameEvent> (event: E): number
  
    getMaxListeners (): number
    setMaxListeners (maxListeners: number): this
}