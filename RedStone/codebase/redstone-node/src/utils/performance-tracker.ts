import { performance } from "perf_hooks";
import axios from "axios";
import { Consola } from "consola";
import mode from "../../mode";

const logger = require("./logger")("utils/performance-tracker") as Consola;
const URL = "https://api.redstone.finance/metrics";
const tasks: { [trackingId: string]: {
  label: string;
  startTime: number;
} } = {};

export function trackStart(label: string): string {
  if (label === "") {
    throw new Error("Label cannot be empty");
  }

  const trackingId = `${label}-${String(performance.now())}`;

  if (tasks[trackingId] !== undefined) {
    logger.warn(
      `Tracking id "${trackingId}" is already being used. Label: "${label}"`);
  } else {
    tasks[trackingId] = {
      label,
      startTime: performance.now(),
    };
  }

  return trackingId;
}

export function trackEnd(trackingId: string): void {
  if (trackingId === "") {
    throw new Error("Tracking id cannot be empty");
  }

  if (tasks[trackingId] === undefined) {
    logger.warn(
      `Cannot execute trackEnd for ${trackingId} without trackStart calling`);
    return;
  }

  // Calculating time elapsed from the task trackStart
  // execution for the same label
  const value = performance.now() - tasks[trackingId].startTime;
  const label = tasks[trackingId].label;

  // Clear the start value
  delete tasks[trackingId];

  // Saving metric using Redstone HTTP endpoint
  saveMetric(label, value);
}

export function printTrackingState() {
  const tasksCount = Object.keys(tasks).length;
  logger.info(`Perf tracker tasks: ${tasksCount}`, JSON.stringify(tasks));
}

async function saveMetric(label: string, value: number): Promise<void> {
  const prefix = process.env.PERFORMANCE_TRACKING_LABEL_PREFIX || "local";
  const labelWithPrefix = `${prefix}-${label}`;

  if (mode.isProd) {
    await axios.post(URL, {
      label: labelWithPrefix,
      value,
    });
  } else {
    logger.info(`Metric: ${labelWithPrefix}. Value: ${value}`);
  }
}
