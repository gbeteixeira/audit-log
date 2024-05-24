import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { RegisterLogUseCase } from "@/domain/audit-log/application/use-cases/register-log";

const createLogBodySchema = z.object({
	userEmail: z.string().email(),
	actionName: z.string(),
	systemName: z.string(),
	lastObject: z.object({}),
	newObject: z.object({}),
});

type CreateLogBodySchema = z.infer<typeof createLogBodySchema>;

@Controller("/log")
export class CreateAuditLogController {
	constructor(private registerLogUseCase: RegisterLogUseCase) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createLogBodySchema))
	async handle(@Body() body: CreateLogBodySchema) {
		const { userEmail, actionName, systemName, lastObject, newObject } =
			body;

		const result = await this.registerLogUseCase.execute({
			userEmail,
			actionName,
			systemName,
			lastObject,
			newObject,
		});

		return {
			result,
		};
		// if (result.isLeft()) {
		//   const error = result.value

		//   switch (error.constructor) {
		//     case StudentAlreadyExistsError:
		//       throw new ConflictException(error.message)
		//     default:
		//       throw new BadRequestException(error.message)
		//   }
		// }
	}
}
