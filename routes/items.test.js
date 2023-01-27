process.env.NODE_ENV = "test";
const request = require("supertest");
const { response } = require("../app");

const app = require("../app");

let items = require("../fakeDB");

let item = { name: "fish", price: 0.5 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});

describe("get /items", function () {
  test("list of items", async function () {
    const response = await request(app).get("/items");
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

describe("get /itmes/:name", function () {
  test("get single item serach", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("responds with 404 if cant be found", async function () {
    const response = await request(app).get("/items/0");
    expect(response.statusCode).toBe(404);
  });
});

describe("post /items", function () {
  test("create item", async function () {
    const response = await request(app)
      .post("/items")
      .send({ name: "olives", price: 2.5 });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("olives");
    expect(response.body.item.price).toEqual(2.5);
  });
});

describe("patch /items/:name", function () {
  test("update item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .setEncoding({ name: "fishyyyy" });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual = { name: "fishyyyy" };
  });
  // test("resp with 404 cant find", function(){
  //     const response = await request(app).patch(`/items/0`)
  //     expect(response.statusCode).toBe(404)
  // })
});

describe("delete /items/:name", function () {
  test("delete item", async function () {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "deleted" });
  });
});
