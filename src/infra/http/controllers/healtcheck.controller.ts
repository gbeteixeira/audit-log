import { Controller, Get } from "@nestjs/common";

@Controller("/health-check")
export class HealthCheckController {
	constructor() {}

	@Get(["/ping"])
	ping(): "pong" {
		return "pong";
	}
}
