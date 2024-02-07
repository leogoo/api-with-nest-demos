import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  // @Get('sendEmail')
  // sendEmail() {
  //   this.cronService.sendEmail();
  // }

  // @Get('schedule')
  // schedule() {
  //   this.cronService.schedule();
  // }
  
  @Get('scheduleDynamic')
  scheduleHandler() {
    this.cronService.scheduleHandler('dynamic_schedule', CronExpression.EVERY_10_SECONDS, () => {
      console.log(11111);
    });
  }
}
