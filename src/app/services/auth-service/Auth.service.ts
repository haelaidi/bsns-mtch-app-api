import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '../../../config/config.service';
import {comparePassword, hashPassword} from '../../../utils/password';
import {JwtEnvironmentEnum} from '../../../common/enums/Environment.enum';
import {SocietyCategoryService, SocietyService, UserService} from "../bsnsmtch-service";
import {UserEntity} from "../../models/entities/bsnsmtch-entity";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly userService: UserService,
                private readonly societyService: SocietyService,
                private readonly societyCategoryService: SocietyCategoryService,
                private readonly configService: ConfigService) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const apiConfig = this.configService.apiConfig();
        const user = {
            username: apiConfig.username,
            password: apiConfig.password,
        };
        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(_user: any): Promise<any> {
        const user = await this.userService._findInfoByEmail(_user.username);
        if (!user) {
            throw new HttpException('Identifiant introuvable !', HttpStatus.NOT_FOUND);
        } else if (!user.enabled) {
            throw new HttpException('Votre compte inactif !', HttpStatus.BAD_REQUEST);
        } else if (!(await comparePassword(_user.password, user.password))) {
            throw new HttpException('Votre email ou mot de passe incorrect !', HttpStatus.BAD_REQUEST);
        }
        let date = new Date();
        date.setDate(date.getDate() + 1);
        return {
            authToken: this.jwtService.sign({user}),
            expiresIn: date,
        };
    }

    async singup(user: any): Promise<any> {
        let nbr: number = 0;
        let userEntity: any = null;

        // verified if society existe
        let society: any = await this.societyService._findOne({label: user.raison_social});
        if (!society)
            [society, nbr] = await this.societyService._upsert({label: user.raison_social});

        // verified if association society_category
        let categotySociete: any = await this.societyCategoryService._findOne({
            idsociety: society.id,
            idcategory: user.idcategory,
        });
        if (!categotySociete)
            [categotySociete, nbr] = await this.societyCategoryService._upsert({
                idsociety: society.id,
                idcategory: user.idcategory,
            });

        // create objet UserEntity
        const userDto = {
            idsociety: society.id,
            idfunction: user.idfunction,
            idtypeuser: user.idtypeuser,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            password: await hashPassword(user.password),
            phone: user.phone,
        };

        // upsert UserEntity
        [userEntity, nbr] = await this.userService._upsert(userDto);
        if (!society.createdby)
            await this.societyService._upsert({id: society.id, createdby: userEntity.id});

        // createdby and updateby created by society_category
        await this.societyCategoryService._upsert({
            idsociety: society.id,
            idcategory: user.idcategory,
            createdby: userEntity.id,
            updatedby: userEntity.id,
        });

        // createdby and updateby created by society_category
        await this.userService._upsert({
            id: userEntity.id,
            verified: false,
            updatedby: userEntity.id,
            verifiedhash: await this._generatedVerifyHash(userEntity),
        });

        return [await this.userService._findOne({id: userEntity.id}), 1];

    }

    async me(token: string): Promise<any> {
        return this.jwtService.decode(token);
    }

    async verify(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token, {secret: this.configService.apiConfig().jwt_secret_verify});
    }

    update(user: any): Promise<any> {
        return this.userService._upsert(user);
    }

    async forgotPassword(token: string): Promise<any> {
        return this.jwtService.decode(token);
    }

    private async _generatedVerifyHash(userEntity: UserEntity): Promise<string> {
        return this.jwtService.sign({
            id: userEntity.id,
            email: userEntity.email,
            firstname: userEntity.firstname,
            lastname: userEntity.phone,
            phone: userEntity.id,
            createdby: userEntity.createdby,
            updatedby: userEntity.updatedby,
            createdat: userEntity.createdat,
            updatedat: userEntity.updatedat,
            rowversion: userEntity.rowversion,
        }, this.configService.jwtOption(JwtEnvironmentEnum.verify));
    }

    _verifyEmailRegExp(email: string): boolean {
        let re: RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return re.test(String(email).toLowerCase());
    }
}
