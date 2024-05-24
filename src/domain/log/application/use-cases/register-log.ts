import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { Log } from "../../enterprise/entities/log";
import { LogsRepository } from "../repositories/logs-repository";

export interface LogUseCaseRequest {
	userEmail: string;
	actionName: string;
	systemName: string;
	lastObject: any;
	newObject: any;
}

export type LogUseCaseResponse = Either<
	null,
	{
		log: Log;
	}
>;

@Injectable()
export class RegisterLogUseCase {
	constructor(private logsRepository: LogsRepository) {}

	async execute({
		userEmail,
		actionName,
		systemName,
		lastObject,
		newObject,
	}: LogUseCaseRequest): Promise<LogUseCaseResponse> {
		const log = Log.create({
			userEmail,
			actionName,
			systemName,
			lastObject,
			newObject,
		});

		await this.logsRepository.create(log);

		return right({
			log,
		});
	}
}
