import { HealthCheckService, HealthCheck, MongooseHealthIndicator } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorator/customize';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
