import * as dotenv from "dotenv";
import * as path from "path";

try {
  if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.development") });
  } else if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });
  }
} catch (error) {
  console.log(error);
}

const config = {
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT || "5001"),
  environment: process.env.NODE_ENV || "development",
  cors: {
    whitelist: ["*"],
    origin: process.env.CORS_ORIGIN || "*",
  },
  argon: {
    argonSecretKey: process.env.ARGON_SECRET || "my_secret_key",
    characterSet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+><",
  },
  database: {
    uri: process.env.MONGO_DB_URI || "host",
  },
  common: {
    rateLimitMaxRequests: parseInt(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS || "20"),
    rateLimitWindowMs: parseInt(process.env.COMMON_RATE_LIMIT_WINDOW_MS || "1000"),
  },
  face: {
    privateKey: process.env.PRIVATE_KEY || ''
  },
  otp: {
    expiryInMinutes: process.env.OTP_EXPIRY_IN_MINUTES || 3,
    defaultLength: process.env.OTP_DEFAULT_LENGTH || 6
  },
  twilio: {
    accountSID: process.env.TWILIO_ACCOUNT_SID || 'account_sid',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'auth_token',
    twilioDefaultSender: process.env.TWILIO_DEFAULT_SENDER || 'twilio_default_sender',
    twilioDefaultReceiver: process.env.TWILIO_DEFAULT_RECEIVER || 'twilio_default_receiver'
  },
};

export default config;
