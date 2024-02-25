import { test, expect } from "vitest";
import { getYtIdFromUrl } from "./get-yt-id-from-url";

test("gets correct id", () => {
  expect(getYtIdFromUrl("https://youtu.be/Kodi2J6o8Zc")).toBe("Kodi2J6o8Zc");
  expect(
    getYtIdFromUrl("https://youtu.be/Kodi2J6o8Zc?si=NILp9ECFB3-zHd-4"),
  ).toBe("Kodi2J6o8Zc");
  expect(
    getYtIdFromUrl(
      "https://www.youtube.com/embed/Kodi2J6o8Zc?si=NILp9ECFB3-zHd-4",
    ),
  ).toBe("Kodi2J6o8Zc");
  expect(getYtIdFromUrl("https://www.youtube.com/watch?v=Kodi2J6o8Zc")).toBe(
    "Kodi2J6o8Zc",
  );
  expect(
    getYtIdFromUrl(
      "https://youtube.com/shorts/wsAnXKptfrA?si=fmRUeGJuHqkTWvGj",
    ),
  ).toBe("wsAnXKptfrA");
  expect(getYtIdFromUrl("https://www.youtube.com/shorts/wsAnXKptfrA")).toBe(
    "wsAnXKptfrA",
  );
});

test("returns null for invalid urls", () => {
  expect(getYtIdFromUrl("https://www.youtube.com/watch")).toBe(null);
  expect(getYtIdFromUrl("https://www.youtube.com/watch?v=")).toBe(null);
  expect(getYtIdFromUrl("https://www.youtube.com/watch?v=1234")).toBe(null);
  expect(getYtIdFromUrl("https://www.youtube.com/watch?v=123456789012")).toBe(
    null,
  );
  expect(getYtIdFromUrl("https://www.youtube.com/watch?v=1234567890123")).toBe(
    null,
  );
  expect(getYtIdFromUrl("https://www.youtube.com/watch?v=12345678901234")).toBe(
    null,
  );
  expect(
    getYtIdFromUrl(
      "https://www.youtube.com/embed/Kodi2J6odd8Zc?si=NILp9ECFB3-zHd-4",
    ),
  ).toBe(null);
  expect(getYtIdFromUrl("https://www.you.tu.be.com/watch?v=Kodi2J6o8Z")).toBe(
    null,
  );
});
