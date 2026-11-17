import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import cookie from "@fastify/cookie";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { AppModule } from "./app.module";

async function bootstrap() {
  const production = process.env.NODE_ENV === "production";
  if (production) {
    if (!process.env.COOKIE_SECRET || process.env.COOKIE_SECRET.length < 32 || process.env.COOKIE_SECRET.startsWith("replace-with-")) {
      throw new Error("COOKIE_SECRET must be configured with at least 32 characters in production.");
    }
    if (!process.env.SMTP_HOST || !(process.env.SMTP_FROM || process.env.SMTP_USER)) {
      throw new Error("SMTP_HOST and SMTP_FROM (or SMTP_USER) are required in production for account verification and recovery.");
    }
    const origins = (process.env.FRONTEND_ORIGIN || "").split(",").map((origin) => origin.trim());
    if (origins.length === 0 || origins.some((origin) => {
      try {
        const url = new URL(origin);
        return url.protocol !== "https:" || url.origin !== origin;
      } catch {
        return true;
      }
    })) {
      throw new Error("FRONTEND_ORIGIN must contain one or more exact HTTPS origins in production.");
    }
    const googleFields = [process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALLBACK_URL];
    if (googleFields.some(Boolean) && !googleFields.every(Boolean)) {
      throw new Error("Configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL together.");
    }
    if (process.env.GOOGLE_CALLBACK_URL && !process.env.GOOGLE_CALLBACK_URL.startsWith("https://")) {
      throw new Error("GOOGLE_CALLBACK_URL must use HTTPS in production.");
    }
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: process.env.NODE_ENV === "production", bodyLimit: 12 * 1024 * 1024 }),
  );
  const fastify = app.getHttpAdapter().getInstance();
  await fastify.register(cookie, { secret: process.env.COOKIE_SECRET });
  await fastify.register(helmet);
  await fastify.register(rateLimit, { max: 100, timeWindow: "1 minute" });
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: (process.env.FRONTEND_ORIGIN || "http://localhost:5173").split(",").map((origin) => origin.trim()),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(Number(process.env.PORT || 3001), "0.0.0.0");
}
void bootstrap();

