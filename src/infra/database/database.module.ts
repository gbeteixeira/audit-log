import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { LogsRepository } from "@/domain/log/application/repositories/logs-repository";
import { PrismaLogsRepository } from "./prisma/repositories/prisma-log-repository";

@Module({
	imports: [],
	providers: [
		PrismaService,
		{
			provide: LogsRepository,
			useClass: PrismaLogsRepository,
		},
	],
	exports: [PrismaService, LogsRepository],
})
export class DatabaseModule {}
