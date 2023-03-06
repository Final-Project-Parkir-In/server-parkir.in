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

    let dataParkingSlot = require("./data/parkingSlot.json");
    dataParkingSlot.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    let dataParkingTransaction = require("./data/parkingTransaction.json");
    dataParkingTransaction.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await sequelize.queryInterface.bulkInsert("Users", dataUser);
    await sequelize.queryInterface.bulkInsert("Malls", dataMall);
    await sequelize.queryInterface.bulkInsert("ParkingSlots", dataParkingSlot);
    await sequelize.queryInterface.bulkInsert(
      "ParkingTransactions",
      dataParkingTransaction
    );

    const user = await User.findOne({
      where: { email: "muhammad@gmail.com" },
    });

    // console.log(user, `<<<<`);

    access_token = createToken({
      id: user.id,
      email: user.email,
    });
    console.log(access_token, `<<<INI`);
  } catch (error) {
    console.log(error, `<<<ERR`);
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
  // await ParkingSlot.destroy({
  //   restartIdentity: true,
  //   truncate: true,
  //   cascade: true,
  // });
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
      id: 5,
      email: "glem633@mail.com",
    });
  });

  test("Register failed Minimum 5 characters required in password", async () => {
    const body = {
      email: "glem633@mail.com",
      password: "1234",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: ["Minimum 5 characters required in password"],
    });
  });

  test("Register failed password is required", async () => {
    const body = {
      email: "glem633@mail.com",
      password: "",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: [
        "password is required",
        "Minimum 5 characters required in password",
      ],
    });
  });

  test("Register failed email is required", async () => {
    const body = {
      email: "",
      password: "123456",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: ["email is required", "Email is not valid"],
    });
  });

  test("Register failed Email is not valid", async () => {
    const body = {
      email: "golem@gmail",
      password: "123456",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: ["Email is not valid"],
    });
  });

  test("Register failed", async () => {
    const body = {
      email: "",
      password: "",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: [
        "email is required",
        "Email is not valid",
        "password is required",
        "Minimum 5 characters required in password",
      ],
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

  test("Login failed email false", async () => {
    const body = {
      email: "golem@mail.com",
      password: "qwerty",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: "Invalid Email or Password",
    });
  });

  test("Login failed password false", async () => {
    const body = {
      email: "muhammad@gmail.com",
      password: "qwert",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: "Invalid Email or Password",
    });
  });

  test("Login failed require email", async () => {
    const body = {
      email: "",
      password: "qwert",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: "email is required",
    });
  });

  test("Login failed require password", async () => {
    const body = {
      email: "muhammad@gmail.com",
      password: "",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: "Password is require",
    });
  });

  //Read Mall
  test("Read All Mall", async () => {
    const response = await request(app).get(`/malls`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array || Object);
  });

  //Read Spots
  test("Read All Spots", async () => {
    const response = await request(app).get(`/spots/1`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array || Object);
    // expect(response.body[0]).toHaveProperty("id", 1);
  });

  //add ParkingSlot
  // test("add ParkingSlot success", async () => {
  //   const body = {
  //     spot: "b-1",
  //     isAvailable: true,
  //     priceOfSpot: 10000,
  //     MallId: 1,
  //   };
  //   const response = await request(app)
  //     .post("/addSlot")
  //     .set("access_token", access_token)
  //     .send(body);
  //   expect(response.status).toBe(201);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toEqual({ name: "Success add Spot" });
  // });

  // Add Booking Spots
  test("Bokking spots success", async () => {
    const response = await request(app)
      .post(`/bookings/1`)
      .set("access_token", access_token);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "successfully booking spots"
    );
  });

  //read all ticket
  test("Read All Ticket", async () => {
    const response = await request(app)
      .get(`/tickets`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    console.log(response.body, `INIBODY`);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("UserId", 1);
    expect(response.body[0]).toHaveProperty("ParkingId", 1);
    expect(response.body[0]).toHaveProperty("amountToPay", 10000);
    expect(response.body[0]).toHaveProperty("User.id", 1);
    expect(response.body[0]).toHaveProperty("User.email", "muhammad@gmail.com");
  });
});
