import chalk from 'chalk';
import { GameLogger } from "game/GameLogger";
import { GameState } from "game/GameState";
import { GameEvents } from 'game/events/GameEvents';
import { PlayerUpdatedEventArgs } from 'game/events/player/PlayerUpdatedEventArgs';

export = 
{
    name: 'playerUpdated' as keyof GameEvents,

    execute: async (args: PlayerUpdatedEventArgs) =>
    {
        //GameLogger.logEvent(`Game state changed from ${chalk.greenBright(GameState[oldState])} to ${chalk.greenBright(GameState[newState])}.`);
    }
}