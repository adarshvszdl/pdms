import config from 'config';
import { TwilioParams } from 'app/types';
import { TwilioService } from './TwilioService';

export class TwilioSMSService extends TwilioService {
    private otpLength: number;
    public otpExpiryInMinutes: number;
    constructor(accountSID: string, authToken: string, twilioDefaultSender: string) {
        super(accountSID, authToken, twilioDefaultSender);
        this.otpLength = config.get<number>('otp.defaultLength') || 6;
        this.otpExpiryInMinutes = config.get<number>('otp.expiryInMinutes') || 3;
    }

    async sendOTPMessage(messageTemplate?:  string, mobile?: string): Promise<string> {
        if (!messageTemplate || !messageTemplate.includes('[OTP]')  || !messageTemplate.includes('[minutes]')) {
            messageTemplate = "Our Guardian Shield verification code is: [OTP]. This code is for multi-factor authentication (MFA) and will expire in [minutes] minutes. Please do not share this code with anyone."
        }

        if (!mobile) {
            mobile = config.get<string>('twilio.twilioDefaultReceiver');
        }

        const otp = this.generateOTP();
        const message = messageTemplate.replace("[OTP]", otp).replace("[minutes]", this.otpExpiryInMinutes.toString());

        const params: TwilioParams = {
            to: mobile,
            message: message
        };

        const twilioReponse = await this.publishMessage(params);
        console.log(mobile);
        console.log(message);
        console.log(otp);
        // console.log(twilioReponse);

        return otp;
    }

    private generateOTP() {
        const min = Math.pow(10, this.otpLength - 1);
        const max = Math.pow(10, this.otpLength) - 1;

        return Math.floor(Math.random() * (max - min + 1) + min).toString();
    }
}

const accountSID = config.get<string>('twilio.accountSID');
const twilioAuthToken = config.get<string>('twilio.authToken');
const twilioDefaultSender = config.get<string>('twilio.twilioDefaultSender');

export const twilioSMSService = new TwilioSMSService(accountSID, twilioAuthToken, twilioDefaultSender);
