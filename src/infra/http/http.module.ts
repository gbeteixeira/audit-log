import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateLogController } from "./controllers/create-log.controller";
import { RegisterLogUseCase } from "@/domain/log/application/use-cases/register-log";
import { HealthCheckController } from "./controllers/healtcheck.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [CreateLogController, HealthCheckController],
	providers: [RegisterLogUseCase],
})
export class HttpModule {}
