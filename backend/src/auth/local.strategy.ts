import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
// @Controller()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    // async validate(username: string, password: string): Promise<any> {
    //     const user = await this.authService.validateUser(username, password)

    //     if (!user) {
    //         throw new UnauthorizedException()
    //     }
    //     return user;
    // }
    
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username);
    
        if (!user) {
            throw new UnauthorizedException();
        }
    
        if (user.password !== password) {
            throw new UnauthorizedException();
        }
    
        return user;
    }
}