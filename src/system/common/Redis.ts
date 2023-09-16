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
 * @package                 Redis storage
 * @source                  https://github.com/eldritch/game.git
 * @version                 1.0.0
 * @license                 GPL-V3
 * 
 *  
*/
import { createClient, RedisClientType } from 'redis';
export class Redis 
{
    private static m_client: RedisClientType;
    private static m_subscriber: RedisClientType;
	private static m_prefix = 'game_';

	public static get client(): RedisClientType
	{
		return this.m_client;
	}

	public static async initialize(): Promise<void> 
	{
		const REDIS_HOST = process.env.REDIS_HOST || '213.142.148.209';
		const REDIS_PORT = process.env.REDIS_PORT || '6379';
		const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'anan1453';

       
		this.m_client = createClient(
		{
			url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
		});

        this.m_subscriber = this.client.duplicate();
        
		this.m_client.on('connect', () => 
        {
            console.log(`Redis connected to ${REDIS_HOST}:${REDIS_PORT}`);
            this.m_client.configSet("notify-keyspace-events", "Ex");
            
        });

		this.m_client.on('error', err => { throw err });          
        this.m_subscriber.subscribe('__keyevent@0__:expired', (key, value) =>
        {
            console.log(`Expire oldu ${key} ${value}`)
        });
		await this.m_client.connect();
        await this.m_subscriber.connect();
	}

	static async setString(key: string, value: any, expireTime: number | null = null): Promise<any> 
	{
		if (expireTime) 
		{
			return await this.m_client.set(this.m_prefix + key, value, { EX: expireTime });
		}
		return await this.m_client.set(this.m_prefix + key, value);
	}

	static async getString(key: string): Promise<any> 
	{
		return await this.m_client.get(this.m_prefix + key);
	}

	static async setJson(key: string, value: any, expireTime: number | null = null): Promise<any> 
	{
		if (expireTime) 
		{
			return await this.m_client.set(this.m_prefix + key, JSON.stringify(value), { EX: expireTime });
		}
		return await this.m_client.set(this.m_prefix + key, JSON.stringify(value));
	}

	static async getJson(key: string): Promise<any> 
	{
		const result = await this.m_client.get(this.m_prefix + key);
		return result ? JSON.parse(result) : null;
	}

	static async setHash(key: string, field: string, value: any, expireTime: number | null = null): Promise<any> 
	{
		const result = await this.m_client.hSet(this.m_prefix + key, field, JSON.stringify(value, null, 2));
		if (expireTime) 
		{
			await this.m_client.expire(this.m_prefix + key, expireTime);
		}
		return result;
	}

	static async getHash(key: string, field: string): Promise<any> 
	{
		const result = await this.m_client.hGetAll(this.m_prefix + key).catch((error) => 
		{
			console.error(error);
		});

		if (result && result[field]) 
		{
			try 
			{
				return JSON.parse(result[field]);
			} 
			catch (error) 
			{
				console.error(error);
			}
		}
		return null;
	}

	static async delHashKey(key: string, field: string): Promise<any> 
	{
		if (field.endsWith('*')) 
		{
			const fieldList = await this.m_client.hKeys(this.m_prefix + key);
			const filteredFields = fieldList.filter((row) => row.startsWith(field.replace('*', '')));
			if (filteredFields.length > 0) 
			{
				await this.m_client.hDel(this.m_prefix + key, filteredFields);
			}
			return true;
		}
		if (field === '') return await this.m_client.del(this.m_prefix + key);
		return await this.m_client.hDel(this.m_prefix + key, field);
	}

	static async delKey(key: string): Promise<any> 
	{
		if (key.endsWith('*')) 
		{
			const keyList = await this.m_client.keys(this.m_prefix + key);
			if (keyList.length > 0) 
			{
				await this.m_client.del(keyList);
			}
			return true;
		}
		return await this.m_client.del(this.m_prefix + key);
	}
}

