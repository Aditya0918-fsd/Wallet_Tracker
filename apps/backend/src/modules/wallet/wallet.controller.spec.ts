import { ForbiddenException } from "@nestjs/common";
import { Model } from "mongoose";
import { OwnedWalletEntry, User } from "../../models";
import { AuthRequest } from "../auth/session.guard";
import { WalletController } from "./wallet.controller";

describe("WalletController record ownership", () => {
  it("scopes deletes to the authenticated session owner", async () => {
    process.env.FRONTEND_ORIGIN = "http://localhost:5173";
    const tx = { deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }) };
    const empty = {};
    const controller = new WalletController(
      tx as unknown as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<User>,
    );
    const request = {
      userId: "authenticated-owner",
      cookies: { wallet_csrf: "nonce" },
      headers: { origin: "http://localhost:5173", "x-csrf-token": "nonce" },
    } as unknown as AuthRequest;

    await controller.deleteRecord(request, { kind: "transactions", id: "record-1" });
    expect(tx.deleteOne).toHaveBeenCalledWith({ userId: "authenticated-owner", recordId: "record-1" });
  });

  it("rejects cross-origin writes before reaching MongoDB", async () => {
    process.env.FRONTEND_ORIGIN = "http://localhost:5173";
    const tx = { deleteOne: jest.fn() };
    const empty = {};
    const controller = new WalletController(
      tx as unknown as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<OwnedWalletEntry>,
      empty as Model<OwnedWalletEntry>, empty as Model<User>,
    );
    const request = {
      userId: "authenticated-owner",
      cookies: { wallet_csrf: "nonce" },
      headers: { origin: "https://attacker.example", "x-csrf-token": "nonce" },
    } as unknown as AuthRequest;

    await expect(controller.deleteRecord(request, { kind: "transactions", id: "record-1" })).rejects.toBeInstanceOf(ForbiddenException);
    expect(tx.deleteOne).not.toHaveBeenCalled();
  });
});
