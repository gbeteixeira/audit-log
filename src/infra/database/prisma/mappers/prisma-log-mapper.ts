import { Logs as PrismaLogs, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Log } from "@/domain/log/enterprise/entities/log";

type FullLogs = Prisma.LogsGetPayload<{
	include: {
		user: true;
		services: true;
	};
}>;

export class PrismaLogMapper {
	static toDomain(raw: FullLogs): Log {
		return Log.create(
			{
				actionName: raw.action,
				lastObject: raw.lastObject,
				newObject: raw.newObject,
				systemName: raw.services.serviceName,
				userEmail: raw.user.email,
				createdAt: raw.createdAt,
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPrisma(log: Log): Prisma.LogsCreateInput {
		return {
			id: log.id.toString(),
			action: log.actionName,
			lastObject: log.lastObject,
			newObject: log.newObject,
			user: {
				connectOrCreate: {
					create: {
						email: log.userEmail,
					},
					where: {
						email: log.userEmail,
					},
				},
			},
			services: {
				connectOrCreate: {
					create: {
						serviceName: log.systemName,
					},
					where: {
						serviceName: log.systemName,
					},
				},
			},
			createdAt: log.createdAt,
		};
	}
}
