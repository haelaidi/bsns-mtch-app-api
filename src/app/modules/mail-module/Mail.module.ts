import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {MailService} from '../../services/mail-service/Mail.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    user: 'lins.dev.contact@gmail.com',
                    pass: 'RFTwTCu2Lv3879D',
                },
            },
            defaults: {
                from: 'info@soluteck.tech', // outgoing email ID
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {
}
