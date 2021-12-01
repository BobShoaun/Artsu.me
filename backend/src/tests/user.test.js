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

describe("PATCH /users", () => {
  test("simple case", async () => {
    await request(app).post("/users/register").send({
      username: "user",
      password: "user123",
      name: "The Best User",
    });
    const response = await request(app).post("/users/login").send({
      username: "user",
      password: "user123",
    });
    const accessToken = response.body.accessToken;
    const userId = response.body.user._id;

    const response2 = await request(app)
      .patch(`/users/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send([
        { op: "replace", path: "/username", value: "userpatched" },
        { op: "replace", path: "/name", value: "The Best User Patched" },
      ]);
    expect(response2.status).toBe(200);
    expect(response2.body.username).toBe("userpatched");
    expect(response2.body.name).toBe("The Best User Patched");
  });
});
