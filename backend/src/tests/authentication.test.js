import request from "supertest";
import app from "../app.js";
import { setupTestDatabase } from "./helpers.js";

setupTestDatabase("test-auth");

describe("POST /users/register", () => {
  test("register new user", async () => {
    const response = await request(app).post("/users/register").send({
      username: "user",
      password: "user123",
      name: "The Best User",
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("The Best User");
    expect(response.body.username).toBe("user");
    expect(response.body.isFeatured).toBe(false);
    expect(response.body.isAdmin).toBe(false);
    expect(response.body.isBanned).toBe(false);
  });

  test("register duplicate username", async () => {
    await request(app).post("/users/register").send({
      username: "user",
      password: "user123",
      name: "The Best User",
    });
    const response = await request(app).post("/users/register").send({
      username: "user",
      password: "user1234",
      name: "The Best User Dup",
    });
    expect(response.status).toBe(409);

    const response2 = await request(app).get("/users");
    expect(response2.status).toBe(200);
    expect(response2.body.length).toBe(1); // still one user
  });

  test("register username with whitespaces", async () => {
    const response = await request(app).post("/users/register").send({
      username: "user user",
      password: "user123",
      name: "The Best User",
    });
    expect(response.status).toBe(400);

    const response2 = await request(app).get("/users");
    expect(response2.status).toBe(200);
    expect(response2.body.length).toBe(0); // no users added
  });
});

describe("POST /users/login", () => {
  test("login user", async () => {
    await request(app).post("/users/register").send({
      username: "user",
      password: "user123",
      name: "The Best User",
    });
    const response = await request(app).post("/users/login").send({
      username: "user",
      password: "user123",
    });
    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("The Best User");
    expect(response.body.user.username).toBe("user");
    expect(response.body.accessToken).toBeDefined();
  });
});
