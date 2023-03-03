const app = require("./app");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const { createToken } = require("./helper/jwt");
const { sequelize } = require("./models");
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

    let dataMall = require("./data/malls.json");
    dataMall.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await sequelize.queryInterface.bulkInsert("Users", dataUser);
    await sequelize.queryInterface.bulkInsert("Malls", dataMall);

    const user = await User.findOne({
      where: { email: "muhammad@gmail.com" },
    });

    access_token = createToken({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.log(error, `<<<<<<<`);
  }
});

afterAll(async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
  await Mall.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

describe("Check", () => {
  //Register
  test("Register success", async () => {
    const body = {
      email: "glem633@mail.com",
      password: "123456",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      email: "glem633@mail.com",
      message: "Succes add Customer",
    });
  });

  //Login
  test("Login success", async () => {
    const body = {
      email: "muhammad@gmail.com",
      password: "qwerty",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(200);
    expect(response.body.email).toEqual("muhammad@gmail.com");
  });

  //Read Mall
  test("Read All Mall", async () => {
    const response = await request(app).get(`/malls`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array || Object);
  });

  // test("Login failed password false", async () => {
  //   const body = {
  //     email: "yamin@gmail.com",
  //     password: "qwer",
  //   };
  //   const response = await request(app).post("/login").send(body);
  //   expect(response.status).toBe(401);
  //   expect(response.body.email).toEqual("yamin@gmail.com");
  // });
});
