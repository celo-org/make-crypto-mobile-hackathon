import fs from "fs";

export function mergeObjects(objects: Array<any>) {
  return Object.assign({}, ...objects);
}

export function readJSON(path: string): any {
  const content = fs.readFileSync(path, "utf-8");
  try {
    return JSON.parse(content);
  } catch (e) {
    throw new Error(`File "${path}" does not contain a valid JSON`);
  }
}

export function timeout(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(() => resolve('timeout'), ms));
}
