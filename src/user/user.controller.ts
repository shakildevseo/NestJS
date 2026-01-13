import { Controller, Get, Post, Delete, Param, Body, ValidationPipe, Patch, ParseIntPipe,  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
      findMany(){
        return this.userService.findMany()
      }



       @Get(":id")
       findUnique(@Param("id", ParseIntPipe) id : number ){
        return this.userService.findUnique(id)
       }
    

       @Post("registration")
       createUser(@Body( new ValidationPipe({whitelist : true})) dto : CreateUserDTO){
         return this.userService.createUser(dto)
       }


       @Patch(":id")
       updateUserById(@Body(new ValidationPipe({whitelist : true}))  dto : UpdateUserDTO, @Param("id", ParseIntPipe) id : number){
        return this.userService.updateUserById(dto, id)
       }

       @Delete(":id")
       deleteUserById(@Param("id", ParseIntPipe) id : number){
        return this.userService.deleteUserById(id)
       }


}
