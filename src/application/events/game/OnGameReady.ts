import chalk from 'chalk';
import { GameLogger } from "game/GameLogger";
import { GameState } from "game/GameState";
import { GameEvents } from 'game/events/GameEvents';

export = 
{
    name: 'gameReady' as keyof GameEvents,

    execute: async (oldState: GameState, newState: GameState) =>
    {
        GameLogger.logEvent(`Game state changed from ${chalk.greenBright(GameState[oldState])} to ${chalk.greenBright(GameState[newState])}.`);
    }
}