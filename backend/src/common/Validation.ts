// import {
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     ValidationArguments
// } from "class-validator";
// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// // import { Agencia } from "./agencia.entity";
// import Users from "src/users/users.entity";

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class EmailExists implements ValidatorConstraintInterface {
//     constructor(
//         @InjectRepository(Users)
//         private userRepository: Repository<Users>
//     ) { }

//     async validate(email: string, args: ValidationArguments): Promise<boolean> {
//         // const user = this.userRepository.findOne({ where: { email: email } })
//         // return !user
//         console.log("email Already", email)
//         const entity = await this.userRepository.findOne({ where: { email: email } });
//         console.log("entity: ", entity)
//         if (entity === null) {
//             return true
//         }
//         else if(entity.email === email){
//             return false
//         }
//     }
// }