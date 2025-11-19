import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserCourseRepository } from './user-course.repository';
import { CreateUserCourseDto } from './dto/create-user-course.dto';

@Injectable()
export class UserCourseService {
	constructor(private readonly repo: UserCourseRepository) {}

	async enroll(dto: CreateUserCourseDto) {
		if (!dto.userId || !dto.courseId) throw new BadRequestException('userId and courseId are required');

		// avoid duplicates
		const exists = await this.repo.findByUserAndCourse(dto.userId, dto.courseId);
		if (exists) throw new BadRequestException('User already enrolled in this course');

		const created = await this.repo.createEnrollment({ user: { userId: dto.userId } as any, course: { id: dto.courseId } as any });
		return created;
	}

	async findByUser(userId: string) {
		return this.repo.findByUser(userId);
	}

	async findAll() {
		return this.repo.findAll();
	}

	async findOne(id: string) {
		const item = await this.repo.findOne(id);
		if (!item) throw new NotFoundException('Enrollment not found');
		return item;
	}

	async remove(id: string) {
		const removed = await this.repo.remove(id);
		if (!removed) throw new NotFoundException('Enrollment not found');
		return removed;
	}
}
