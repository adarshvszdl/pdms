import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

export interface IOtpLog extends Document {
  otpLogId: string;
  userId: string;
  otp: string;
  expiry: Date;
  hasVerified: boolean;
}

const OtpLogSchema = new Schema<IOtpLog>(
  {
    otpLogId: {
      type: String,
      default: () => uuidv4(),
    },
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    hasVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const OtpLog = mongoose.model<IOtpLog>("OtpLog", OtpLogSchema);
