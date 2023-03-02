const app = require("./app");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const { sequelize } = require("./models");
const { createToken } = require("./helper/jwt");
const {
  Cars,
  Mall,
  ParkingSlot,
  ParkingTransaction,
  User,
} = require("./models");
let access_token;

beforeAll(async () => {
  try {
    let dataUser = require("./data/users.json");
    dataUser.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      let hash = bcrypt.hashSync(el.password, 8);
      el.password = hash;
    });

    await sequelize.queryInterface.bulkInsert("Users", dataUser);

    const user = await User.findOne({
      where: { email: "muhammad@gmail.com" },
    });

    access_token = createToken({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

describe("Check", () => {
  //Login
  test("Login success", async () => {
    const body = {
      email: "muhammad@gmail.com",
      password: "qwerty",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(500);
    expect(response.body.email).toEqual("muhammad@gmail.com");
  });

  //   test("Login failed password false", async () => {
  //     const body = {
  //       email: "yamin@gmail.com",
  //       password: "qwert",
  //     };
  //     const response = await request(app).post("/login").send(body);
  //     expect(response.status).toBe(200);
  //     expect(response.body.email).toEqual("yamin@gmail.com");
  //   });
});
