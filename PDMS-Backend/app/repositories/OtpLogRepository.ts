import { IOtpLog, OtpLog } from "app/models/OtpLog";

export class OtpLogRepository {
  async findById(otpLogId: string): Promise<IOtpLog | null> {
    const otpLog = await OtpLog.findOne({ otpLogId });

    return otpLog;
  }

  async findByUserAndOtp(userId: string, otp: string): Promise<IOtpLog | null> {
    const otpLog = await OtpLog.findOne({ userId, otp });

    return otpLog;
  }

  async findLatestLogForUser(userId: string): Promise<IOtpLog | null> {
    const otpLog = await OtpLog.findOne({ userId }).sort({
      createdAt: -1,
    });

    return otpLog;
  }

  async createOtpLog(payload: IOtpLog): Promise<IOtpLog> {
    const result = await OtpLog.create(payload);

    return result;
  }

  async verifyOtp(userId: string, otp: string) {
    await OtpLog.updateOne(
      {
        userId,
        otp,
      },
      {
        hasVerified: true,
      }
    );
  }

  async verifyAllOtp(userId: string, otp: string) {
    await OtpLog.updateMany(
      {
        userId,
      },
      {
        hasVerified: true,
      }
    );
  }
}
