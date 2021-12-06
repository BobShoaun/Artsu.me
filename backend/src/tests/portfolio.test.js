import request from "supertest";
import app from "../app.js";
import { setupTestDatabase } from "./helpers.js";

setupTestDatabase("test-portfolio");

describe("GET /users/:userId/portfolio", () => {
  test("get portfolio", async () => {
    const response = await request(app).post("/users/register").send({
      username: "user",
      password: "user123",
      name: "The Best User",
    });

    const userId = response.body._id;
    const response2 = await request(app).get(`/users/${userId}/portfolio`);
    expect(response2.status).toBe(200);
    expect(response2.body.userId).toBe(userId);
    expect(response2.body.section.hero.isVisible).toBe(true);
    expect(response2.body.section.about.isVisible).toBe(true);
    expect(response2.body.section.experience.isVisible).toBe(true);
    expect(response2.body.section.project.isVisible).toBe(true);
    expect(response2.body.section.contact.isVisible).toBe(true);
  });
});
