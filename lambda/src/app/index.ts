import { getRandomMeme } from "./handlers/getRandomMeme.js";
import { getHealth } from "./handlers/getHealth.js";

const GetRandomMeme = "GetRandomMeme" as const;
const GetHealth = "GetHealth" as const;

type Request = {
  type: string;
};

const typeRoutes = {
  [GetRandomMeme]: getRandomMeme,
  [GetHealth]: getHealth,
} as const;

export const typeRouter = async (request: Request) => {
  const handler = typeRoutes[request.type as keyof typeof typeRoutes];
  if (!handler) {
    throw new Error(`Unknown request type: ${request.type}`);
  }
  return await handler();
};
