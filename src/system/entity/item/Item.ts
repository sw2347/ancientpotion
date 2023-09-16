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
 * @package                 Item System
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * 
 *  
*/
import { Column, Entity } from "typeorm";
import { ListableGameEntity } from 'game/entity/ListableGameEntity';
import { ItemType } from "game/entity/item/ItemType";
import { PlayerClass } from "game/entity/player/PlayerClass";
import { ItemFeature } from "game/entity/item/ItemFeature";

@Entity({ name: 'items' })
export class Item extends ListableGameEntity
{
    /**
     * Gets or sets item level
     * 
     * @type {number}
     * 
    */
    @Column({ name: 'level', type: 'integer', nullable: false, default: 1 })
    level: number;

    /**
     * Gets or sets item type
     * 
     * @type {ItemType}
     * 
    */
    @Column({ name: 'type', type: 'enum', enum: ItemType, nullable: false, default: ItemType.Empty })
    type: ItemType;

    /**
     * Gets or sets item allowed classes
     * 
     * @type {PlayerClass[]}
     * 
    */
    @Column({ name: 'classes', type: 'enum', enum: PlayerClass, array: true, nullable: false, default: [PlayerClass.Wizard, PlayerClass.Witch] })
    classes: PlayerClass[];

    /**
     * Getsor sets item feature
     * 
     * @type {ItemFeature[]}
     * 
    */
    @Column({ name: 'features', type: 'enum', enum: ItemFeature, array: true, nullable: false, default: [ItemFeature.Craftable, ItemFeature.Enchantable, ItemFeature.Tradable, ItemFeature.Upgradable] })
    features: ItemFeature[];

    /**
     * Determines is item upgradable or not
     * 
     * @public
     * @function isUpgradable
     * @returns {boolean}
     * 
    */
    public isUpgradable(): boolean { return this.features.includes(ItemFeature.Upgradable) }

    /**
     * Determines is item craftable or not
     * 
     * @public
     * @function isCraftable
     * @returns {boolean}
     * 
    */
    public isCraftable(): boolean { return this.features.includes(ItemFeature.Craftable) }
    
    /**
     * Determines is item enchantable or not
     * 
     * @public
     * @function isEnchantable
     * @returns {boolean}
     * 
    */
    public isEnchantable(): boolean { return this.features.includes(ItemFeature.Enchantable) }
    
    /**
     * Determines is item tradable or not
     * 
     * @public
     * @function isTradable
     * @returns {boolean}
     * 
    */
    public isTradable(): boolean { return this.features.includes(ItemFeature.Tradable) }

    public d():boolean{return false}
}