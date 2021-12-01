import request from "supertest";
import app from "../app.js";
import { setupTestDatabase } from "./helpers.js";

setupTestDatabase("test-user");

describe("GET /users", () => {
  test("simple case", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
