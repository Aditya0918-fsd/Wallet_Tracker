import { ServiceUnavailableException } from "@nestjs/common";
import { Connection } from "mongoose";
import { HealthController } from "./health.controller";

describe("HealthController", () => {
  it("reports readiness when MongoDB is connected", () => {
    const controller = new HealthController({ readyState: 1 } as Connection);
    expect(controller.check()).toEqual({ status: "ok", database: "connected" });
  });

  it("returns unavailable when MongoDB is disconnected", () => {
    const controller = new HealthController({ readyState: 0 } as Connection);
    expect(() => controller.check()).toThrow(ServiceUnavailableException);
  });
});
