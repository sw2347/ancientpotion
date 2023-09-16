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
 * @package                 UI Select menu component
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * 
 *  
*/
import { ActionRowBuilder, StringSelectMenuBuilder, CommandInteraction, CacheType, Message, InteractionResponse, InteractionCollector, StringSelectMenuInteraction, APISelectMenuOption, ComponentType, InteractionReplyOptions, InteractionUpdateOptions, MessagePayload, StringSelectMenuOptionBuilder } from "discord.js";
import { UIYesOrNoButton } from "./UIYesOrNoButton";
import { ListableGameEntity } from "game/entity/ListableGameEntity";
import { Database } from "sqlite3";
import { EntityTarget, FindOneOptions, FindManyOptions, ObjectLiteral } from "typeorm";
import { DEFAULT_SELECT_MENU_LIMIT, MAX_COLLECTOR_INTERVAL } from "game/Constants";

export type UISelectMenuSetting = 'collectorTimeoutInterval' | 'timeoutMessage' | 'restrictedUseMessage' | 'placeholder' | 'minimumSelect' | 'maximumSelect' | 'cancelOption' | 'cancelIcon' | 'cancelLabel';
export class UISelectMenuComponent
{
    //#region private members
    private m_usedInteraction: CommandInteraction<CacheType>;
    private m_component: ActionRowBuilder<StringSelectMenuBuilder>;
    private m_selectMenu: StringSelectMenuBuilder;
    private m_isInitializedFromExisting: boolean;
    private m_settings: Map<UISelectMenuSetting, string | number | boolean>;
    private m_cancelOptionId: string;
    private m_followUp: Message<boolean>;
    private m_collector: InteractionCollector<StringSelectMenuInteraction<CacheType>>;
    private m_currentCollection: StringSelectMenuInteraction<CacheType>;
    private m_lastMessage: InteractionResponse<boolean>;
    private m_selectedValues: string[];
    private m_isTimedOut: boolean = true;
    private m_optionSelected: boolean = false;
    //#endregion

    //#region getters
    /**
     * Gets used interaction infor
     * 
    */
    public get interaction(): CommandInteraction<CacheType>
    {
        return this.m_usedInteraction;
    }

    /**
     * Gets or sets select menu settings
     * 
    */
    public get settings(): Map<UISelectMenuSetting, string | number | boolean>
    {
        return this.m_settings;
    }

    /**
     * Gets active created collector
     * 
    */
    public get collector(): InteractionCollector<StringSelectMenuInteraction<CacheType>>
    {
        return this.m_collector;
    }
    //#endregion

    constructor()
    {
        this.m_settings = new Map<UISelectMenuSetting, string | number>();
    }
    
    //#region functions
    /**
     * Creates new UI select menu component
     * 
     * @overload
     * @param {CommandInteraction} interaction
     * @returns {Promise<void>}
     *  
    */
    public create(interaction: CommandInteraction<CacheType>): void

    /**
     * Creates new UI select menu component from existing select menu component
     * 
     * @overload
     * @param {UISelectMenu} component              Existing select menu component
     * @returns {Promise<void>} 
     * 
    */
    public create(component: UISelectMenuComponent): void
    public create(object: CommandInteraction<CacheType> | UISelectMenuComponent): void
    {
        // create new component
        if (object instanceof CommandInteraction)
        {
            this.m_usedInteraction = object as CommandInteraction<CacheType>;
            this.m_component = new ActionRowBuilder<StringSelectMenuBuilder>();
            this.m_selectMenu = new StringSelectMenuBuilder();
        }

        // create component from existing component
        if (object instanceof UISelectMenuComponent)
        {
            this.create((object as UISelectMenuComponent).interaction);
            this.m_isInitializedFromExisting = true;
            this.m_followUp = object.m_followUp;
        }
    }

    /**
     * Binds determined database entity into select menu
     * 
     * @param {EntityTarget<T>} entity                                  Entity to bind 
     * @param {FindOneOptions<T>|undefined} options                    Filter to apply
     * 
     * @returns {Promise<void>}
     * 
    */
    public async bind<T extends ListableGameEntity>(entity: EntityTarget<T>, options?: FindOneOptions<T> | undefined): Promise<void>;

    /**
     * Binds determined database entity into select menu
     * 
     * @param {EntityTarget<T>} entity                                  Entity to bind 
     * @param {FindManyOptions<T>|undefined} options                    Filter to apply
     * 
     * @returns {Promise<void>}
     * 
    */
    public async bind<T extends ListableGameEntity>(entity: EntityTarget<T>, options?: FindManyOptions<T> | undefined): Promise<void>;
    
    /**
     * Binds determined database entity into select menu
     * 
     * @param {EntityTarget<T>} entity                                  Entity to bind 
     * @param {FindManyOptions<T>|FindOneOptions<T>} options            Filter to apply
     * 
     * @returns {Promise<void>}
     * 
    */
    public async bind<T extends ObjectLiteral>(entity: EntityTarget<T>, options?: FindManyOptions<T> | FindOneOptions<T> | undefined): Promise<void>
    {
        let repository = Database.connection.getRepository(entity);
        let records = await repository.find(options);
        let selectOption: StringSelectMenuOptionBuilder[] & APISelectMenuOption[] = [];
        let option = new StringSelectMenuOptionBuilder();

        for await (let i of records)
        {
            option.setLabel(i.name).setDescription(i.description).setValue(i.id.toString()).setEmoji(i.emoji)
            selectOption.push(option);
        }

        // add cancel option end of menu
        if ((this.settings.has('cancelOption') as boolean) === true)
        {
            // generate cancel option value to avoid duplication
            this.m_cancelOptionId = `cancel_${Date.now().toString()}`;

            // set cancel icon
            if (this.settings.has('cancelIcon')) option.setEmoji(this.settings.get('cancelIcon') as string);

            // set label and value
            option.setLabel(this.settings.get('cancelLabel') as string);
            option.setValue(this.m_cancelOptionId);
            selectOption.push(option);
        }
        this.m_selectMenu.addOptions(selectOption);
        return Promise.resolve();
    }

    /**
     * Builds select menu component with given informations
     * 
     * @returns {Promise<void>}
     * 
    */
    public async build(): Promise<ActionRowBuilder<StringSelectMenuBuilder>>
    {
        // build select menu options
        if (this.settings.has('minimumSelect')) this.m_selectMenu.setMinValues(this.settings.get('minimumSelect') as number || DEFAULT_SELECT_MENU_LIMIT);
        if (this.settings.has('maximumSelect')) this.m_selectMenu.setMaxValues(this.settings.get('maximumSelect') as number || DEFAULT_SELECT_MENU_LIMIT);
        if (this.settings.has('placeholder')) this.m_selectMenu.setPlaceholder(this.settings.get('placeholder') as string);
        
        this.m_selectMenu.setCustomId(`selectMenu_${Date.now().toString()}`);
        this.m_component.addComponents(this.m_selectMenu);
        return Promise.resolve(this.m_component);
    }

    /**
     * Follow up current component interaction
     * 
     * @param {(string | MessagePayload | InteractionReplyOptions) & InteractionUpdateOptions} option       Follow up option
     * @returns {Promise<Message<boolean>>}
     * 
    */
    public async followUp(option: (string | MessagePayload | InteractionReplyOptions) & InteractionUpdateOptions): Promise<Message<boolean>>
    {
        if (this.collector !== undefined)
        {
            // check if collector is not ended yet
            if (this.collector.ended === false)
            {
                this.m_currentCollection.update(option);
                this.collector.stop();
            }
        }
        else
        {
            if (this.m_isInitializedFromExisting)
            {
                this.m_lastMessage = await this.m_currentCollection.update(option);
            }
            else this.m_followUp = await this.interaction.followUp(option);
        }
        return Promise.resolve(this.m_followUp);
    }

    /**
     * Creates a collector for select menu component
     * 
     * @returns {Promise<void>}
     * 
    */
    public async createCollector(): Promise<void> 
    {
        this.m_collector = this.m_followUp.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: this.settings.get('collectorTimeoutInterval') as number || MAX_COLLECTOR_INTERVAL });
        this.m_collector.on('collect', async (collection) =>
        {
            this.m_currentCollection = collection;

            // check is someone tries to interact with interaction
            if (collection.user.id !== this.interaction.user.id)
            {
                // send restricted usage message
                await this.m_currentCollection.reply({ content: this.settings.get('restrictedUseMessage') as string, ephemeral: true });
                return;
            }
            else
            {
                this.m_selectedValues = collection.values;
                this.m_isTimedOut = false;
                this.m_optionSelected = true;
                this.collector.stop();
                return Promise.resolve();
            }
        })

        this.m_collector.on('end', async () =>
        {
            if (this.m_isTimedOut)
            {
                this.m_optionSelected = false;
                this.m_followUp = await this.interaction.editReply({ content: this.settings.get('timeoutMessage') as string, components: [] });
                return Promise.resolve();
            }
        });
    }

    /**
     * Replies collector selection
     * 
     * @param {string|MessagePayload|InteractionReplyOptions} option        Reply optios 
     * @returns {Promise<void>}
     */
    public async replyCollection(option: string | MessagePayload | InteractionReplyOptions): Promise<void>
    {
        this.m_followUp = await this.interaction.editReply(option);
        return Promise.resolve();
    }

    public getSelectedValue(): string { return this.m_selectedValues[0]; }
    public getSelectedValues(): string[] { return this.m_selectedValues }
}