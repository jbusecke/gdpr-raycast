import { describe, expect, it } from "vitest";
import { SUBJECT, buildBody, firstName } from "./notice";

describe("firstName", () => {
  it("returns the first token of a full name", () => {
    expect(firstName("Jane Doe", "fallback")).toBe("Jane");
  });

  it("handles a single name", () => {
    expect(firstName("Acme", "fallback")).toBe("Acme");
  });

  it("trims surrounding whitespace", () => {
    expect(firstName("  Jane   Doe ", "fallback")).toBe("Jane");
  });

  it("falls back when the name is empty", () => {
    expect(firstName("", "news@acme.com")).toBe("news@acme.com");
    expect(firstName("   ", "news@acme.com")).toBe("news@acme.com");
  });
});

describe("buildBody", () => {
  const body = buildBody({ addressee: "Jane", email: "me@example.com", yourName: "Julius" });

  it("addresses the sender by name", () => {
    expect(body.startsWith("Dear Jane,")).toBe(true);
  });

  it("names the email address to remove", () => {
    expect(body).toContain("Email address: me@example.com");
  });

  it("signs with the configured name", () => {
    expect(body.endsWith("Regards,\nJulius")).toBe(true);
  });

  it("cites Article 21 and Article 17", () => {
    expect(body).toContain("Article 21 of the GDPR");
    expect(body).toContain("Article 17 GDPR");
  });
});

describe("SUBJECT", () => {
  it("matches the notice subject line", () => {
    expect(SUBJECT).toBe("GDPR Notice — Stop Processing and Remove My Email Address");
  });
});
