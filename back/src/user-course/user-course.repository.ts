import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from 'src/entities/user-course.entity';

@Injectable()
export class UserCourseRepository {
	constructor(
		@InjectRepository(UserCourse)
		private readonly repo: Repository<UserCourse>,
	) {}

	async createEnrollment(data: Partial<UserCourse>) {
		const ent = this.repo.create(data);
		return this.repo.save(ent);
	}

	findByUser(userId: string) {
		return this.repo.find({
			where: { user: { userId } } as any,
			relations: ['user', 'course'],
		});
	}

	findByUserAndCourse(userId: string, courseId: string) {
		return this.repo.findOne({
			where: { user: { userId }, course: { id: courseId } } as any,
			relations: ['user', 'course'],
		});
	}

	findAll() {
		return this.repo.find({ relations: ['user', 'course'] });
	}

	findOne(id: string) {
		return this.repo.findOne({ where: { id }, relations: ['user', 'course'] });
	}

	async remove(id: string) {
		const res = await this.repo.delete(id);
		return (res.affected ?? 0) > 0;
	}
}