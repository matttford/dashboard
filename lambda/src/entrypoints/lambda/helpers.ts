import { LambdaFunctionURLEvent } from "aws-lambda";

type Request = {
  type: string;
};

const exit = (message = "Unknown Error") => {
  throw new Error(message);
};

const isDirectInvokeEvent = (event: any): event is Request => {
  return event?.type !== undefined && typeof event.type === "string";
};

const isLambdaURLEvent = (event: any): event is LambdaFunctionURLEvent => {
  return event?.body !== undefined && event?.headers !== undefined;
};

const unwrapLambdaURLEvent = (event: LambdaFunctionURLEvent): Request => {
  const body = event?.body;
  if (!body) {
    return exit("Unable to process LambdaFunctionURLEvent, missing body.");
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    return exit("Unable to parse LambdaFunctionURLEvent body as JSON.");
  }
};

export const unwrapEvent = (event: unknown): Request => {
  try {
    // prettier-ignore
    return isDirectInvokeEvent(event)
      ? event
      : isLambdaURLEvent(event)
      ? unwrapLambdaURLEvent(event)
      : exit("Unable to process event, unknown event type.");
  } catch (error) {
    console.log(JSON.stringify(event, null, 2));
    console.error("ERROR: [Unknown Lambda Event]", error);
    throw error;
  }
};
