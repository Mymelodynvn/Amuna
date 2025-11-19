import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Delete,
	UseGuards,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesDecorator } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enum/roles.enum';

@Controller('user-course')
@UseGuards(AuthGuard)
export class UserCourseController {
	constructor(private readonly userCourseService: UserCourseService) {}

	@Post()
	async enroll(@Body() dto: CreateUserCourseDto) {
		try {
			const created = await this.userCourseService.enroll(dto);
			return { status: HttpStatus.CREATED, data: created };
		} catch (err: any) {
			if (err instanceof HttpException) throw err;
			throw new HttpException({ message: err?.message || 'Error inscribiendo' }, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':userId')
	async findByUser(@Param('userId') userId: string) {
		try {
			const list = await this.userCourseService.findByUser(userId);
			return { status: HttpStatus.OK, data: list };
		} catch (err: any) {
			throw new HttpException({ message: err?.message || 'Error obteniendo inscripciones' }, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	@UseGuards(RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
	async remove(@Param('id') id: string) {
		try {
			const removed = await this.userCourseService.remove(id);
			return { status: HttpStatus.NO_CONTENT, data: removed };
		} catch (err: any) {
			if (err instanceof HttpException) throw err;
			throw new HttpException({ message: err?.message || 'Error eliminando inscripción' }, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
