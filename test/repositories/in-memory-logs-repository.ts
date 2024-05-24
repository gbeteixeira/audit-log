import { LogsRepository } from "@/domain/log/application/repositories/logs-repository";
import { Log } from "@/domain/log/enterprise/entities/log";

export class InMemoryStudentsRepository implements LogsRepository {
	public items: Log[] = [];

	async create(logs: Log) {
		this.items.push(logs);
	}
}
