const request = require("supertest");
const app = require("../app");

const sendMailMock = jest.fn(); // this will return undefined if .sendMail() is called

// In order to return a specific value you can use this instead
// const sendMailMock = jest.fn().mockReturnValue(/* Whatever you would expect as return value */);

jest.mock("nodemailer");

const nodemailer = require("nodemailer"); //doesn't work with import. idk why
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

beforeEach(() => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});

describe("", () => {
  const user = {
    email: "test@test.com",
    password: "test1234",
  };
  test("", async () => {
    // 1 - 200 status code; 2 - check email was sent
    expect.assertions(2);

    const response = await request(app)
      .post("/login")
      // global variable
      .send({ email: user.email, password: user.password })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    // should complete successfully
    expect(response.status).toBe(200);

    // TODO not sure how to express the expect statement here
    expect(sendMailMock).toHaveBeenCalled();
  });
});
