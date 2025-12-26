import { typeRouter } from "../../app/index.js";
import { unwrapEvent } from "./helpers.js";

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

export const handler = async (event: any) => {
  try {
    const request = unwrapEvent(event);
    const data = await typeRouter(request as { type: string });

    return {
      statusCode: HTTP_STATUS_OK,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("ERROR:", error);

    const statusCode =
      error instanceof Error && error.message.includes("Unknown request type")
        ? HTTP_STATUS_BAD_REQUEST
        : HTTP_STATUS_INTERNAL_SERVER_ERROR;

    return {
      statusCode,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
    };
  }
};

