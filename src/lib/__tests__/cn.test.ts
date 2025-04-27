import { describe, expect, it } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("merges tailwind classes correctly", () => {
    expect(cn("text-red-500", "font-bold")).toBe("text-red-500 font-bold");
  });

  it("removes conflicting classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4"); // because tailwind-merge keeps the latest
  });

  it("handles undefined or empty values", () => {
    expect(cn("p-2", undefined, "", null, "m-2")).toBe("p-2 m-2");
  });
});
