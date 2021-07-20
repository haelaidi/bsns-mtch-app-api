import {Controller, Get, Post, Body, Param, UseGuards, Req, Res, HttpStatus, HttpException} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthService} from '../../services/auth-service';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';
import {ApiResponse} from '../../../common/helpers/api-response/api-response';
import {AuthDto, ChangePasswordDto, SingupDto} from '../../models/dtos/auth-dto';
import {VerifyDto} from '../../models/dtos/auth-dto/Verify-dto';
import {UserDto} from "../../models/dtos/bsnsmtch-dto/User-dto";
import {UserService} from "../../services/bsnsmtch-service";
import {MailService} from "../../services/mail-service";
import {comparePassword, hashPassword} from "../../../utils/password";

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends ApiResponse {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService,
                private readonly mailService: MailService
    ) {
        super();
    }

    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() request: any, @Res() response: any): Promise<ApiResponse> {
        try {
            const {body} = request;
            const [userDto, message] = await this._onTransformAndValidate(AuthDto, body);
            if (!userDto) {
                throw new HttpException(message, HttpStatus.BAD_REQUEST);
            } else {
                const user = await this.authService.login(userDto);
                await this._onSuccess(user);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() request: any, @Res() response: any) {
        const {user} = request;
        if (!user)
            await this._onError('Not header authorization token exist !', null, HttpStatus.BAD_REQUEST);
        else
            await this._onSuccess(user);
        return await this.send(response);
    }

    //@UseGuards(LocalAuthGuard)
    @Post('singup')
    async singup(@Req() request: any, @Res() response: any) {
        try {
            const {body} = request;
            const [entityDto, message]: any = await this._onTransformAndValidate(SingupDto, body);
            if (!entityDto) {
                await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
                return await this.send(response);
            }
            const user = await this.userService._findOne({email: entityDto.email});
            if (user) {
                await this._onError('Email déjà inscrit !', new Error('Email déjà inscrit !'), HttpStatus.BAD_REQUEST);
                return await this.send(response);
            }
            const data = await this.authService.singup(entityDto);
            await this._onSuccess(data);

        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    //@UseGuards(LocalAuthGuard)
    @Get('verify')
    async verify(@Req() request: any, @Res() response) {
        try {
            const {query} = request;

            const [verifyDto, message] = await this._onTransformAndValidate(VerifyDto, query);
            if (verifyDto) {
                throw new HttpException('Paramétre de vérification invalide !', HttpStatus.BAD_REQUEST)
            }
            const data = await this.authService.verify(verifyDto.id);
            await this.userService._upsert({id: data.id, verified: true, verifiedat: new Date()});
            this._onSuccess(null, 0, 'Vérification succès.');
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    //@UseGuards(LocalAuthGuard)
    @Get('resend-verification/:email')
    async resendVerification(@Req() request: any, @Res() response) {
        try {
            const {email} = request.params;
            if (!email || !this.authService._verifyEmailRegExp(email)) {
                throw new HttpException('Paramétre d\'émail invalide !', HttpStatus.BAD_REQUEST);
            }

            const userEntity = await this.userService._findOne({email: email});
            if (!userEntity) {
                throw new HttpException('Email introuvable !', HttpStatus.BAD_REQUEST);
            }

            await this.mailService.sendEmail({
                to: email,
                subject: 'Vérification d\'émail',
                text: 'Vérification votre email'
            });

            this._onSuccess('Re-vérification terminé avec succès.');

        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    //@UseGuards(LocalAuthGuard)
    @Post('forgot-password/:email')
    async forgotPassword(@Req() request: any, @Res() response) {
        try {
            const {email} = request.params;
            if (!email || !this.authService._verifyEmailRegExp(email)) {
                throw new HttpException('Paramétre d\'émail invalide !', HttpStatus.BAD_REQUEST);
            }

            const userEntity = await this.userService._findOne({email: email});
            if (!userEntity) {
                throw new HttpException('Email introuvable !', HttpStatus.BAD_REQUEST);
            }

            const newPassword = new Date().getTime().toString();

            await this.userService._upsert({
                id: userEntity.id,
                password: await hashPassword(newPassword)
            });

            await this.mailService.sendEmail({
                to: email,
                subject: 'Réinitialisation du mot de passe',
                text: 'Votre nouveau mot de passe est : ' + newPassword
            });

            this._onSuccess('Mot de passe rénitialiser avec succès.\nVeuillez vérifier votre boite email.');
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    @UseGuards(JwtAuthGuard)
    @Post('reset-password')
    async resetPassword(@Req() request: any, @Res() response) {
        try {
            const {user} = request;
            const {body} = request;
            const [entityDto, message]: any = await this._onTransformAndValidate(ChangePasswordDto, body);
            if (!entityDto) {
                await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
                return await this.send(response);
            }
            if (!user) {
                this._onError('Paramétre invalide !', new Error('Paramétre invalide !'), HttpStatus.BAD_REQUEST);
                return await this.send(response);
            }

            const userEntity = await this.userService._findOne({id: user.user.id});
            if (!(await comparePassword(entityDto.oldpassword, userEntity.password))) {
                this._onError('Ancien mot de passe incorrect !', new Error('Ancien mot de passe incorrect !'), HttpStatus.BAD_REQUEST);
                return await this.send(response);
            }

            await this.userService._upsert({id: userEntity.id, password: entityDto.newpassword});
            this._onSuccess(null, 0, 'Mot de passe change avec succès.');
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    @UseGuards(JwtAuthGuard)
    @Get('update')
    async update(@Req() request: any, @Res() response: any) {
        try {
            const {body} = request;
            const [userDto, message] = await this._onTransformAndValidate(UserDto, body);
            if (!userDto) {
                throw new HttpException(message, HttpStatus.BAD_REQUEST);
            } else {
                const user = await this.authService.update(userDto);
                await this._onSuccess(user);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }
}
