import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateLogController } from "./controllers/create-log.controller";
import { RegisterLogUseCase } from "@/domain/log/application/use-cases/register-log";

@Module({
	imports: [DatabaseModule],
	controllers: [CreateLogController],
	providers: [RegisterLogUseCase],
})
export class HttpModule {}
