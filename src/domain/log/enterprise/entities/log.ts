import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface LogProps {
	userEmail: string;
	actionName: string;
	systemName: string;
	lastObject: any;
	newObject: any;
	createdAt: Date;
}

export class Log extends Entity<LogProps> {
	get userEmail() {
		return this.props.userEmail;
	}

	get actionName() {
		return this.props.actionName;
	}

	get systemName() {
		return this.props.systemName;
	}

	get lastObject() {
		return this.props.lastObject;
	}

	get newObject() {
		return this.props.newObject;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	static create(props: Optional<LogProps, "createdAt">, id?: UniqueEntityID) {
		const log = new Log(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return log;
	}
}
