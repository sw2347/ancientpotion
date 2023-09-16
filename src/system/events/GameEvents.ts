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
import { GameState } from "game/GameState"
import { Account } from 'game/entity/account/Account';
import { AccountStatus } from "game/entity/account/AccountStatus";
import { PlayerUpdatedEventArgs } from "./player/PlayerUpdatedEventArgs";
import { PlayerDeleteEventArgs } from "./player/PlayerDeleteEventArgs";

export type GameEvents =
{
    gameReady: () => void;
    gameStateChanged: (oldState: GameState, newState: GameState) => void;

    suspendInteraction: (user: string) => void;
    startInteraction: (account: Account, interaction: string) => void;
    accountStatusChanged: (account: Account, oldStatus: AccountStatus, newStatus: AccountStatus) => void;
    accountCreated: (account: Account) => void;
    accountUpdated: (oldAccount: Account, newAccount: Account) => void;
    accountDeleted: (account: Account) => void;

    expEarned: (account: Account, experience: number) => void;
    itemDropped: (account: Account, item: any) => void;
    playerUpdated: (args: PlayerUpdatedEventArgs) => void;
    playerDeleted: (args: PlayerDeleteEventArgs) => void;
}