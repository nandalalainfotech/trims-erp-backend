import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';



@Global() // 👈 optional to make module global
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: config.get("MAIL_SERVICE"),
          host:  config.get("MAIL_HOST"),
          port: config.get("EMAIL_PORT"),
          secure: false,
          ignoreTLS: true,
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get("MAIL_FROM")}>`,
        },
        tls: {
          rejectUnauthorized: false
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
