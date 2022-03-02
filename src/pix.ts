import { BigInt } from "@graphprotocol/graph-ts";
import { Requested } from "./entities/PIX/PIX";
import {
  Global,
  PIXRequested,
} from "./entities/schema";
import { PIX as PIXContract } from "../src/entities/PIX/PIX";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";


export function handlePIXRequested(event: Requested): void {
  let entity = Global.load("pixRequested");
  if (entity == null) {
    entity = new Global("pixRequested");
    entity.value = new BigInt(0);
  }

  let pixRequested = new PIXRequested(entity.value.toString());
  pixRequested.requestedId = entity.value;
  pixRequested.dropId = event.params.dropId;
  pixRequested.playerId = event.params.playerId;
  pixRequested.mode = event.params.mode;
  pixRequested.count = event.params.count;
  pixRequested.purchasedPacks = event.params.purchasedPacks;
  pixRequested.save();

  entity.value = entity.value.plus(BigInt.fromI32(1));
  entity.save();
}
