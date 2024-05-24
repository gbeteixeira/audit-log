import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Create Log (E2E)", () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		prisma = moduleRef.get(PrismaService);

		await app.init();
	});

	test("[POST] /log", async () => {
		const response = await request(app.getHttpServer())
			.post("/log")
			.send({
				userEmail: "johndoe@example.com",
				actionName: "update-user",
				systemName: "Example",
				lastObject: {
					name: "Doe John",
				},
				newObject: {
					name: "John Doe",
				},
			});

		expect(response.statusCode).toBe(201);

		const logsOnDatabase = await prisma.logs.findFirst({
			where: {
				action: "update-user",
			},
		});

		expect(logsOnDatabase).toBeTruthy();
	});
});
