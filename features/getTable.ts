import { ParsedUrlQuery } from "querystring";

export const getTable = (
  query: ParsedUrlQuery,
  defs: Record<string, "number" | "string" | "number[]" | "string[]">
) => {
  const decoded: any = {};
  const params = new URLSearchParams(query as any);

  const types = Object.values(defs),
    keys = Object.keys(defs);

  for (let i = 0; i < keys.length; i++) {
    const type = types[i],
      key = keys[i];

    const value = params.get(key);

    if (value == null) {
      decoded[key] = null;
      continue;
    }

    if (type == "string") {
      decoded[key] = value;
      continue;
    }

    if (type == "number") {
      if (!isNaN(+value)) {
        decoded[key] = +value;
        continue;
      }
    }
    if (type == "number[]") {
      const arr = JSON.parse(value);
      if (Array.isArray(arr)) {
        decoded[key] = arr.map((x) => +x);
        continue;
      }
    }
    if (type == "string[]") {
      const arr = JSON.parse(value);
      if (Array.isArray(arr)) {
        decoded[key] = arr as string[];
        continue;
      }
    }

    decoded[key] = value;
  }

  // TODO: Call graphql

  return {}; // TODO: Return data for table
};
