import { TwilioParams } from 'app/types';
import { Twilio } from 'twilio';

export abstract class TwilioService {
    private client: Twilio;
    private twilioDefaultSender: string;

    constructor(accountSID: string, authToken: string, twilioDefaultSender: string) {
        this.client = new Twilio(accountSID, authToken);
        this.twilioDefaultSender = twilioDefaultSender;
    }

    async publishMessage(params: TwilioParams): Promise<any> {
        try {
            return await this.client.messages.create({
                body: params.message,
                to: params.to,
                from: this.twilioDefaultSender
            });
        } catch (error: any) {
            if (error.name === 'AccessDenied') {
                error.statusCode = 403;
            }

            throw error;
        }
    }
}
