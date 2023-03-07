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

    let dataCars = require("./data/cars.json");
    dataCars.forEach((el) => {
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
    await sequelize.queryInterface.bulkInsert("Cars", dataCars);

    const user = await User.findOne({
      where: { email: "muhammad@gmail.com" },
    });

    // console.log(user, `<<<<`);

    access_token = createToken({
      id: user.id,
      email: user.email,
    });
    // console.log(access_token, `<<<INI`);
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
      name: "bunja",
      phoneNumber: "0823786678",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      id: 5,
      email: "glem633@mail.com",
    });
  });

  test("Register failed email already use", async () => {
    const body = {
      email: "glem633@mail.com",
      password: "123456",
    };
    const response = await request(app).post("/register").send(body);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object || Array);
    expect(response.body).toEqual({
      message: ["Email address already in use!"],
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
    const response = await request(app)
      .get(`/malls`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array || Object);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("name", "PIM");
    expect(response.body[0]).toHaveProperty("address", "Jakarta Selatan");
    expect(response.body[0]).toHaveProperty("long", "106.78272676099691");
    expect(response.body[0]).toHaveProperty("lat", "-6.265670347012476");
    expect(response.body[0]).toHaveProperty(
      "imgUrl",
      "https://awsimages.detik.net.id/visual/2021/05/03/dok-pondok-indah-mall_169.jpeg?w=650"
    );
  });

  //Read Detail Mall
  test("Read Detail Mall", async () => {
    const response = await request(app)
      .get(`/malls/1`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name", "PIM");
    expect(response.body).toHaveProperty("address", "Jakarta Selatan");
    expect(response.body).toHaveProperty("long", "106.78272676099691");
    expect(response.body).toHaveProperty("lat", "-6.265670347012476");
    expect(response.body).toHaveProperty(
      "imgUrl",
      "https://awsimages.detik.net.id/visual/2021/05/03/dok-pondok-indah-mall_169.jpeg?w=650"
    );
  });

  //Read Detail Mall not found
  test("Read Detail Mall not found", async () => {
    const response = await request(app)
      .get(`/malls/100`)
      .set("access_token", access_token);
    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("name", "Mall not found");
  });

  //Read parkingSpots
  test("Read All parkingSpots", async () => {
    const response = await request(app)
      .get(`/parkingSlot/1`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array || Object);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("spot", "b-1");
    expect(response.body[0]).toHaveProperty("priceOfSpot", 10000);
    expect(response.body[0]).toHaveProperty("MallId", 1);
  });

  //Read parkingSpots login first
  test("Read parkingSpots login first", async () => {
    const response = await request(app).get(`/parkingSlot/1`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Login First");
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

  // Add Booking Spots slot not found
  test("Bokking spots success slot not found", async () => {
    const response = await request(app)
      .post(`/bookings/100`)
      .set("access_token", access_token);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("msg", "parking slot not found");
  });

  // Add Booking Spots fail
  test("Add Booking Spots fail", async () => {
    const response = await request(app).post(`/bookings/1`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Login First");
  });

  //read all ticket
  test("Read All Ticket", async () => {
    const response = await request(app)
      .get(`/tickets`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    console.log(response.body, `INIBODY`);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id", 2);
    expect(response.body[0]).toHaveProperty("UserId", 1);
    expect(response.body[0]).toHaveProperty("ParkingId", 1);
    expect(response.body[0]).toHaveProperty("amountToPay", 2000);
    expect(response.body[0]).toHaveProperty("User.id", 1);
    expect(response.body[0]).toHaveProperty("User.email", "muhammad@gmail.com");
  });

  //read all ticket false 401
  test("read all ticket false 401", async () => {
    const response = await request(app).get(`/tickets`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Login First");
  });

  // checkin
  test("Checkin success", async () => {
    const response = await request(app)
      .post(`/checkIn/1`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  // checkin exp
  // test("Checkin exp", async () => {
  //   const response = await request(app)
  //     .post(`/checkIn/1`)
  //     .set("access_token", access_token);
  //   expect(response.status).toBe(400);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty(
  //     "message",
  //     "Your ticket is already expired"
  //   );
  // });

  // checkin error 500
  test("Checkin error 500", async () => {
    const response = await request(app)
      .post(`/checkIn/1`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "car checked in parking spot"
    );
  });

  // Checkout
  test("Checkout", async () => {
    const response = await request(app)
      .get(`/checkOut/1`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("token");
  });

  // Checkout Login First
  test("Checkout", async () => {
    const response = await request(app).get(`/checkOut/1`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Login First");
  });

  // Checkout error 500
  test("Checkout error 500", async () => {
    const response = await request(app)
      .get(`/checkOut/100`)
      .set("access_token", access_token);
    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
  });

  // read all cars
  test("read all cars", async () => {
    const response = await request(app)
      .get(`/getCars`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array || Object);
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("numberPlate", "b 123 abc");
    expect(response.body[0]).toHaveProperty("brand", "toyoti");
    expect(response.body[0]).toHaveProperty("type", "supri");
    expect(response.body[0]).toHaveProperty("UserId", 1);
    expect(response.body[0]).toHaveProperty("isDefault", null);
  });

  // read all cars login first
  test("read all cars login first", async () => {
    const response = await request(app).get(`/getCars`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Login First");
  });

  // add cars
  test("add cars", async () => {
    const body = {
      numberPlate: "bk 123 abc",
      brand: "prjero",
      type: "suv",
    };
    const response = await request(app)
      .post(`/addCar/1`)
      .send(body)
      .set("access_token", access_token);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("car.id", 5);
    expect(response.body).toHaveProperty("car.UserId", 1);
    expect(response.body).toHaveProperty("car.numberPlate", "bk 123 abc");
    expect(response.body).toHaveProperty("car.brand", "prjero");
    expect(response.body).toHaveProperty("car.type", "suv");
    expect(response.body).toHaveProperty("car.isDefault", true);
    expect(response.body).toHaveProperty("msg", "Car succefully created");
  });

  // add cars eror 400
  test("add cars error", async () => {
    const body = {
      numberPlate: "bk 123 abc",
      brand: "prjero",
      type: "suv",
    };
    const response = await request(app)
      .post(`/addCar/1`)
      .send(body)
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object || Array);
    expect(response.body).toHaveProperty("message", [
      "plat is already on list",
    ]);
  });

  // add cars eror 400 require plat
  test("add cars eror 400 require plat", async () => {
    const body = {
      numberPlate: "",
      brand: "prjero",
      type: "suv",
    };
    const response = await request(app)
      .post(`/addCar/1`)
      .send(body)
      .set("access_token", access_token);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object || Array);
    expect(response.body).toHaveProperty("message", ["plat is required"]);
  });

  // add cars eror 401
  test("add cars error", async () => {
    const body = {
      numberPlate: "bk 123 abc",
      brand: "prjero",
      type: "suv",
    };
    const response = await request(app).post(`/addCar/1`).send(body);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Login First");
  });

  // addSecondCar
  // test("addSecondCar", async () => {
  //   const body = {
  //     numberPlate: "bk 123 abc",
  //     brand: "prjero",
  //     type: "suv",
  //   };
  //   const response = await request(app)
  //     .post(`/addSecondCar/1`)
  //     .send(body)
  //     .set("access_token", access_token);
  //   expect(response.status).toBe(201);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty("car.id", 5);
  //   expect(response.body).toHaveProperty("car.UserId", 1);
  //   expect(response.body).toHaveProperty("car.numberPlate", "bk 123 abc");
  //   expect(response.body).toHaveProperty("car.brand", "prjero");
  //   expect(response.body).toHaveProperty("car.type", "suv");
  //   expect(response.body).toHaveProperty("msg", "Car succefully created");
  // });

  //read all nearestMalls
  test("Read All nearestMalls", async () => {
    const response = await request(app)
      .get(`/nearestMalls`)
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    // console.log(response.body, `INIBODY`);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("name", "PIM");
    expect(response.body[0]).toHaveProperty("long", "-6.265670347012476");
    expect(response.body[0]).toHaveProperty(
      "imgUrl",
      "https://awsimages.detik.net.id/visual/2021/05/03/dok-pondok-indah-mall_169.jpeg?w=650"
    );
  });
});
