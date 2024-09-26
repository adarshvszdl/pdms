import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { faceUtil } from "app/common/utils/FaceUtil";
import { FaceData } from "app/models/FaceData";
import { FaceDataRepository } from "app/repositories/FaceDataRepository";
import { twilioSMSService } from "./TwilioSMSService";
import { OtpLogRepository } from "app/repositories/OtpLogRepository";
import { DateUtil } from "app/utils/DateUtil";
import { IOtpLog } from "app/models/OtpLog";
import {
  ModifiedPathsSnapshot,
  Document,
  Model,
  Types,
  ClientSession,
  DocumentSetOptions,
  QueryOptions,
  UpdateQuery,
  AnyObject,
  PopulateOptions,
  MergeType,
  Query,
  SaveOptions,
  ToObjectOptions,
  FlattenMaps,
  Require_id,
  UpdateWithAggregationPipeline,
  pathsToSkip,
  Error,
} from "mongoose";

const mimetypes = require("mime-types");

export class CommonService {
  private faceDataRepository: FaceDataRepository;
  private otpLogRepository: OtpLogRepository;

  constructor(
    faceDateRepository = new FaceDataRepository(),
    otpLogRepository = new OtpLogRepository()
  ) {
    this.faceDataRepository = faceDateRepository;
    this.otpLogRepository = otpLogRepository;
  }

  async registerFace(
    face: string,
    descriptor: any
  ): Promise<{
    initVector: string;
    faceDescriptor: string;
    path: string;
  }> {
    const mime = face.split(";")[0].split(":")[1];
    const ext = mimetypes.extension(mime);
    const path = "uploads/" + uuidv4() + "." + ext;

    fs.writeFile(path, face.split(",")[1], "base64", (e) => {
      if (e) {
        console.log(e);
        throw "Unable to save file.";
      }
    });

    const iv = faceUtil.getInitializationVector(16);
    const initVector: any = Buffer.from(iv).toString("base64");
    const faceDescriptor = faceUtil.encryptBiometrics(descriptor, iv);

    return { initVector, faceDescriptor, path };
  }

  async authorizeFace(id: any, face: string, descriptor: any, threshold = 0.5) {
    const faceData = await this.faceDataRepository.findByUserId(id);

    if (!faceData) {
      console.log("no face data");
      throw new Error("Face data not found for user");
    }

    const { initVector, faceDescriptor } = faceData;

    const initVectorBuffer = Buffer.from(initVector, "base64");
    const biometrics = faceUtil.decryptBiometrics(
      faceDescriptor,
      initVectorBuffer
    );
    const distance = faceUtil.euclideanDistance(descriptor, biometrics);

    if (distance < threshold) {
      return true;
    }

    return false;
  }

  async generateAndSendOTP(
    userId: string,
    message?: string,
    mobile?: string
  ): Promise<void> {
    const otp = await twilioSMSService.sendOTPMessage(message, mobile);

    await this.otpLogRepository.createOtpLog({
      otp,
      expiry: DateUtil.afterMinutes(twilioSMSService.otpExpiryInMinutes),
      userId,
    } as IOtpLog);
  }
}

export const commonService = new CommonService();
