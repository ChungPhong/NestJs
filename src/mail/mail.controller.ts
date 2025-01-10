import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  async handleTestEmail() {
    await this.mailerService.sendMail({
      to: 'nguhaha113@gmail.com',
      from: "'Support Team' <support@example.com>", // override default from
      subject: 'Welcome to Nice App! Confirm your Email', //Tiêu đề
      html: '<b>welcome bla bla chung phong</b>', // HTML body content
    });
  }
}
