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
 * @package                 Abstract class for game entities
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * @namespace               Entity
 *  
*/
import { BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class ListableGameEntity extends BaseEntity
{
    /**
     * Gets entity identifier
     * 
     * @public
     * @type {number}
     * 
    */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Gets or sets entity name
     * 
     * @public
     * @type {string}
     * 
    */
    @Column({ name: 'name', type: 'varchar', length: 75, nullable: false })
    name: string;

    /**
     * Gets or sets entity description
     * 
     * @public
     * @type {string}
     * 
    */
    @Column({ name: 'description', type: 'text', nullable: true })
    description: string;

    /**
     * Gets or sets entity icon
     * 
     * @public
     * @type {string}
     * 
    */
    @Column({ name: 'icon', type: 'varchar', nullable: true })
    icon: string;
    
    /**
     * The date the entity was created
     * 
     * @public
     * @type {Date}
     * 
    */
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    /**
     * The date the entity was updated
     * 
     * @public
     * @type {Date}
     * 
    */
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    /**
     * The date the entity was deleted
     * 
     * @public
     * @type {Date}
     * 
    */
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}