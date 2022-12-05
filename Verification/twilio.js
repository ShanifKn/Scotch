import * as dotenv from "dotenv";
dotenv.config();
import { default as Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sessionID = process.env.TWILIO_SESSION_SID;

const sendSms = (phone) => {
  const client = Twilio(accountSid, authToken);
  console.log(client);
  client.verify.v2
    .services(sessionID)
    .verifications.create({ to: `+91${phone}`, channel: "sms" })
    .then((verification) => console.log(verification.status));
};

const verifySms = (phone, otp) => {
  const client = Twilio(accountSid, authToken);
  return new Promise((resolve, reject) => {
    client.verify.v2
      .services(sessionID)
      .verificationChecks.create({ to: `+91${phone}`, code: otp })
      .then((verification_check) => {
        console.log(verification_check.status);
        resolve(verification_check);
      });
  });
};

export { sendSms, verifySms };
