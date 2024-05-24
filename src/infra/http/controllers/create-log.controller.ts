import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { RegisterLogUseCase } from "@/domain/log/application/use-cases/register-log";

const createLogBodySchema = z.object({
	userEmail: z.string().email(),
	actionName: z.string(),
	systemName: z.string(),
	lastObject: z.any(),
	newObject: z.any(),
});

type CreateLogBodySchema = z.infer<typeof createLogBodySchema>;

@Controller("/log")
export class CreateLogController {
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

		if (result.isLeft()) {
			throw new BadRequestException(result.value);
		}
	}
}
