import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailPlatforme, IMailText } from '../../interfaces/mail-interface/mail.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async sendEmail(mail: IMailText): Promise<any> {
    return await this
      .mailerService
      .sendMail({
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
      });
  }

  async sendEmailTemplate(mail: IMailPlatforme): Promise<any> {
    return await this
      .mailerService
      .sendMail({
        to: mail.to,
//        from: 'lins.dev.contact@gmail.com',
        subject: mail.subject,
        template: mail.template,
        context: mail.context,
      });
  }
}
