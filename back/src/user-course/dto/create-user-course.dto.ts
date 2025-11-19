import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateUserCourseDto {
	@IsUUID()
	@IsNotEmpty()
	userId: string;

	@IsUUID()
	@IsNotEmpty()
	courseId: string;
}
