import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { LogsRepository } from "@/domain/log/application/repositories/logs-repository";
import { Log } from "@/domain/log/enterprise/entities/log";
import { PrismaLogMapper } from "../mappers/prisma-log-mapper";

@Injectable()
export class PrismaLogsRepository implements LogsRepository {
	constructor(private prisma: PrismaService) {}

	async create(log: Log): Promise<void> {
		const data = PrismaLogMapper.toPrisma(log);

		await this.prisma.logs.create({
			data,
		});
	}
}
