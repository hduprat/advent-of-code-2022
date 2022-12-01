import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { stub } from "https://deno.land/std@0.166.0/testing/mock.ts";
import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";

mf.install();

import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import { getAoCInput } from "./file.ts";

stub(Deno, "readTextFile", () => new Promise((r) => r("123456")));

const mockAoCFetch = (output: string) =>
  mf.mock("GET@/:year/day/:day/input", () => {
    return new Response(output, {
      status: 200,
    });
  });

describe("getAoCInput", () => {
  beforeAll(mf.install);
  afterAll(mf.uninstall);
  afterEach(() => mf.reset());

  it("successfully gets a file's contents in an array", async () => {
    mockAoCFetch(`hl-WP
    vl-fo
    vl-WW
    WP-start
    vl-QW
    fo-wy
    WW-dz
    dz-hl
    fo-end
    VH-fo
    ps-vl
    FN-dz
    WP-ps
    ps-start
    WW-hl
    end-QW
    start-vl
    WP-fo
    end-FN
    hl-QW
    WP-dz
    QW-fo
    QW-dz
    ps-dz`);
    const content = await getAoCInput(12, 2021);

    assertEquals(content[0], "hl-WP");
    assertEquals(content.length, 24);
  });

  it("successfully gets a one-line file contents in an array of length 1", async () => {
    mockAoCFetch("one line");
    const content = await getAoCInput(12, 2021);

    assertEquals(content[0], "one line");
    assertEquals(content.length, 1);
  });

  it("successfully parses an empty file", async () => {
    mockAoCFetch("");
    const content = await getAoCInput(12, 2021);

    assertEquals(content.length, 0);
  });
});
