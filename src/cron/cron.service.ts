import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // @Cron('0 * * * * *')
  // sendEmail() {
  //   console.log('send email');
  // }

  // @Cron(CronExpression.EVERY_30_MINUTES)
  // schedule() {
  //   console.log('schedule');
  // }

  addJob(jobName: string, cronExpression: string, callback: () => void) {
    const job = new CronJob(cronExpression, callback);
    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();
  }

  removeJob(jobName: string) {
    this.schedulerRegistry.deleteCronJob(jobName);
  }

  scheduleHandler(jobName: string, cronExpression: string, callback: () => void) {
    const doesJobExist = this.schedulerRegistry.doesExist("cron", jobName);
    if (doesJobExist) {
      this.removeJob(jobName);
    }
    this.addJob(jobName, cronExpression, callback);
  }
}
