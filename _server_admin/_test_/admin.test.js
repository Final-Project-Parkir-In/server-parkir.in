const app = require('../app')
const request = require('supertest');
let admin_id
const sinon = require('sinon');




describe('Register Test >>>>>> ', () => {
    //Register
    jest.setTimeout(30000);
    const body = {
        userName: "admin test",
        email: "admin-test@gmail.com",
        password: "12345",
    };
    test("Register success", async () => {
        const response = await request(app).post("/admin/register").send(body);
        // console.log(response.body.insertedId, '<<<<<< datanya')
        admin_id = response.body.insertedId
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({
            "acknowledged": true,
            "insertedId": expect.any(String),
        });
    })

    test("Register failed with empty Username", async () => {
        const body = {
            userName: "",
            email: "admin-testedd@gmail.com",
            password: "12345"
        }
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"userName\" is not allowed to be empty"
            ]
        })
    })


    test("Register failed with Undifined Username", async () => {
        const body = {
            email: "admin-testedd@gmail.com",
            password: "12345"
        }
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"userName\" is required"
            ]
        })
    })

    test("Register failed with empty email", async () => {
        const body = {
            userName: "admin test",
            email: "",
            password: "12345"
        }
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"email\" is not allowed to be empty"
            ]
        })
    })

    test("Register failed with Undifined Email", async () => {
        const body = {
            userName: "admin",
            password: "12345"
        }
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"email\" is required"
            ]
        })
    })

    test("Register failed with empty password", async () => {
        const body = {
            userName: "admin test",
            email: "admin-testdd@gmail.com",
            password: ""
        }
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" is not allowed to be empty"
            ]
        })
    })

    test("Register failed with Undifined Password", async () => {
        const body = {
            userName: "admin",
            email: "admin-testedd@gmail.com",
        }
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" is required"
            ]
        })
    })

    test("Register failed with password length <5", async () => {
        const body = {
            userName: "admin test",
            email: "admin-testdd@gmail.com",
            password: "1234"
        }
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" length must be at least 5 characters long"
            ]
        })
    })

    test("Register failed with Existing Email", async () => {
        const response = await request(app).post("/admin/register").send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": `Email is Allready used`
        })
    })


});


describe('Login Test >>>>>> ', () => {
    test("Login Success", async () => {
        const body = {
            email: "admin-test@gmail.com",
            password: "12345",
        };
        const response = await (await request(app).post(`/admin/login`).send(body))
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": "Succesfully to login"
        })
    })

    test("Login Failed with empty email", async () => {
        const body = {
            email: "",
            password: "12345",
        };
        const response = await (await request(app).post(`/admin/login`).send(body))
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"email\" is not allowed to be empty"
            ]
        })
    })

    test("Login Failed with undifined email", async () => {
        const body = {
            password: "12345",
        };
        const response = await (await request(app).post(`/admin/login`).send(body))
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"email\" is required"
            ]
        })
    })

    test("Login Failed with empty password", async () => {
        const body = {
            email: "admin@gmail.com",
            password: "",
        };
        const response = await (await request(app).post(`/admin/login`).send(body))
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" is not allowed to be empty"
            ]
        })
    })

    test("Login Failed with undifined password", async () => {
        const body = {
            email: "admin@gmail.com",

        };
        const response = await (await request(app).post(`/admin/login`).send(body))
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" is required"
            ]
        })
    })


    test("Login Failed with wrong password", async () => {
        const body = {
            email: "admin-testedd@mail.com",
            password: "123456",
        };
        const response = await (await request(app).post(`/admin/login`).send(body))
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": "Invalid Username or Password"
        })
    })


})



describe('Find Admin Test >>>>>> ', () => {

    test('Success to Find All Admin', async () => {
        const response = await request(app).get(`/admin`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        // expect(response.body).toEqual()
    })

    test('Success to Find Admin By _id', async () => {
        const response = await request(app).get(`/admin/${admin_id}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "id": expect.any(String),
            "userName": expect.any(String),
            "email": expect.any(String),
        })
    })

    test('Failed to Find Admin With Wrong _id', async () => {
        const response = await request(app).get(`/admin/6406ec778391def96217b28c`)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": "Invalid Username or Password"
        })
    })

    test('Failed to Find Admin With _id string less than 24 hex characters', async () => {
        const response = await request(app).get(`/admin/6406ec778391def96217b28`)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
        })
    })
})

describe('Edit Admin Test >>>>>>', () => {

    test(`Success to Edit`, async () => {
        const bodyEdit = {
            userName: "admin new",
            email: "admin-new2@gmail.com",
            password: "123456"
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": `Successfully updated data`
        })
    })

    test(`Failed to Edit with empty UserName`, async () => {
        const bodyEdit = {
            userName: "",
            email: "admin-test@gmail.com",
            password: "12345",
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"userName\" is not allowed to be empty"
            ]
        })
    })

    test(`Failed to Edit with Undifined UserName`, async () => {
        const bodyEdit = {
            email: "admin-test@gmail.com",
            password: "12345",
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"userName\" is required"
            ]
        })
    })

    test(`Failed to Edit with empty Email`, async () => {
        const bodyEdit = {
            userName: "adfkl",
            email: "",
            password: "12345",
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"email\" is not allowed to be empty"
            ]
        })
    })

    test(`Failed to Edit with Undifined Email`, async () => {
        const bodyEdit = {
            userName: "admin",
            password: "12345",
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"email\" is required"
            ]
        })
    })

    test(`Failed to Edit with empty Password`, async () => {
        const bodyEdit = {
            userName: "adlfkja",
            email: "admin-test@gmail.com",
            password: "",
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" is not allowed to be empty"
            ]
        })
    })

    test(`Failed to Edit with Undifined Password`, async () => {
        const bodyEdit = {
            userName: "admin",
            email: "admin-test@gmail.com",
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" is required"
            ]
        })
    })

    test(`Failed to Edit with Password Length < 5`, async () => {
        const bodyEdit = {
            userName: "admin",
            email: "admin-test@gmail.com",
            password: "1234"
        };
        const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toEqual({
            "message": [
                "\"password\" length must be at least 5 characters long"
            ]
        })
    })

    // test(`Failed to Edit with Internal Server Error`, async () => {
    //   const bodyEdit = {
    //     userName: "admin",
    //     email: "admin-test@gmail.com",
    //     password: "1234"
    //   };
    //   sinon = sinon.stub(itemQueries, 'search').throws(Error('db query failed'))
    //   const response = await request(app).patch(`/admin/${admin_id}`).send(bodyEdit).throws(Error('db query failed'))
    //   expect(response.status).toBe(500)
    //   expect(response.body).toBeInstanceOf(Object)
    //   expect(response.body).toEqual({
    //     "message": "Internal Server Error"
    //   })
    // })




})

describe('Delete Test >>>>>> ', () => {

    test("Failed to Delete with wrong _id ", async () => {
        const response = await request(app).delete(`/admin/6406ec778391def96217b28c`)
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({
            "message": "Data not found"
        });
    });

    test("Delete _id success", async () => {
        const response = await request(app).delete(`/admin/${admin_id}`)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({
            "message": expect.any(String)
        });
    });
})