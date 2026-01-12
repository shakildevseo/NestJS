import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{

    constructor(private config : ConfigService){
        const adapter = new PrismaMariaDb({
            host :  config.get('DATABASE_HOST'),
            user :  config.get('DATABASE_USER'),
            port :  config.get('DATABASE_PORT'),
            database : config.get('DATABASE_NAME'),
            password : config.get('DATABASE_PASSWORD'),
            connectionLimit : 5
        })

        super({
            adapter
        })
    }

   async onModuleInit() {
       await this.$connect()
   }
   async onModuleDestroy() {
       await this.$disconnect()
   }

}
