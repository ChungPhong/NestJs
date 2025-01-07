import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  //Tạo mới Job
  @Post()
  @ResponseMessage('Create a new Job')
  async create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  //Cập nhật
  @ResponseMessage('Update a Job')
  @Patch(":id")
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

 //Fetch User by ID
 @Get(':id')
 @ResponseMessage('Fetch a job by id')
 async findOne(@Param('id') id: string) {
   const foundJob = await this.jobsService.findOne(id);
   return foundJob;
 }

  @Delete(':id')
  @ResponseMessage('Delete a Job')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }

    //Fetch Job with paginate
    @Get()
    @ResponseMessage('Fetch job with paginate')
    findAll(
      @Query('current') currentPage: string,
      @Query('pageSize') limit: string,
      @Query() qs: string,
    ) {
      return this.jobsService.findAll(+currentPage, +limit, qs);
    }
}
