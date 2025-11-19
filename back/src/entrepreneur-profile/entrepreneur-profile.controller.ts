import {
Body,
Controller,
Delete,
Get,
HttpCode,
HttpStatus,
Param,
Post,
Put,
Req,
UseGuards,
} from '@nestjs/common';
import { EntrepreneurProfileService } from './entrepreneur-profile.service';
import { CreateEntrepreneurProfileDto } from './Dtos/createEntrepreneurProfile.dto';
import { UpdateEntrepreneurProfileDto } from './Dtos/updateEntrepreneurProfile.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/enum/roles.enum';
import { RolesDecorator } from 'src/decorators/roles.decorator';

@Controller('entrepreneur-profile')
export class EntrepreneurProfileController {
	constructor(
		private readonly entrepreneurProfileService: EntrepreneurProfileService,
	) {}

	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
	@Get('getAllEntrepreneurProfiles')
	@HttpCode(HttpStatus.OK)
	async getAllEntrepreneurProfiles() {
		const profiles =
			await this.entrepreneurProfileService.getAllEntrepreneurProfilesService();
		return {
			statusCode: HttpStatus.OK,
			message: 'Entrepreneur profiles retrieved successfully',
			data: profiles,
		};
	}

	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
	@Get('getEntrepreneurProfileById/:uuid')
	@HttpCode(HttpStatus.OK)
	async getEntrepreneurProfileById(@Param('uuid') uuid: string) {
		const profile =
			await this.entrepreneurProfileService.getEntrepreneurProfileByIdService(
				uuid,
			);

		return {
			statusCode: HttpStatus.OK,
			message: 'Entrepreneur profile retrieved successfully',
			data: profile,
		};
	}

	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Post('createEntrepreneurProfile')
	@HttpCode(HttpStatus.CREATED)
	async postCreateEntrepreneurProfile(
		@Body() createEntrepreneurDto: CreateEntrepreneurProfileDto,
		@Req() req,
	) {
		const userUuid = req.user.userId || req.user.uuid;
		const profile =
			await this.entrepreneurProfileService.postCreateEntrepreneurProfileService(
				createEntrepreneurDto,
				userUuid,
			);

		return {
			statusCode: HttpStatus.CREATED,
			message: 'Entrepreneur profile created successfully',
			data: profile,
		};
	}

	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Put('updateEntrepreneurProfile')
	@HttpCode(HttpStatus.OK)
	async putUpdateEntrepreneurProfile(
		@Body() updateEntrepreneurDto: UpdateEntrepreneurProfileDto,
	) {
		const updated =
			await this.entrepreneurProfileService.putUpdateEntrepreneurProfileService(
				updateEntrepreneurDto,
			);

		return {
			statusCode: HttpStatus.OK,
			message: 'Entrepreneur profile updated successfully',
			data: updated,
		};
	}

	@UseGuards(AuthGuard('jwt'), RolesGuard)
	@Delete('deleteEntrepreneurProfile/:uuid')
	@HttpCode(HttpStatus.OK)
	async deleteEntrepreneurProfile(@Param('uuid') uuid: string) {
		const deleted =
			await this.entrepreneurProfileService.deleteEntrepreneurProfileService(
				uuid,
			);

		return {
			statusCode: HttpStatus.OK,
			message: 'Entrepreneur profile deleted successfully',
			data: deleted,
		};
	}
}
