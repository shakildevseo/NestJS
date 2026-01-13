import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Database থেকে ঠিক যেগুলা দরকার, শুধু সেগুলাই anar jonno select use kori

  //findAll
  async findMany() {
    const allUser = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      status: true,
      count: allUser.length,
      data: allUser,
    };
  }

  // get user by id

  async findUnique(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const { password, ...safeUser } = user;
    return {
      status: true,
      data: safeUser,
    };
  }

  // create user
  async createUser(dto: CreateUserDTO) {
   
    const {password : userPassword} = dto
    
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(userPassword, salt)

    const createUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        password: hashPassword
      },
    });

    //remove password for client
    const { password, ...safeUser } = createUser;
    return {
      status: true,
      message: 'user registration successfully',
      data: safeUser,
    };
  }

  // update user
  async updateUserById(dto: UpdateUserDTO, id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: dto.username,
        email: dto.email,
        password: dto.password,
        phoneNumber: dto.phoneNumber,
      },
    });

    // password remove for client
    const { password, ...safeUser } = updateUser;
    return {
      status: true,
      message: 'user update successfully',
      data: safeUser,
    };
  }

  //delete user
  async deleteUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id }, 
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const userDeleted = await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return {
      status: true,
      message: 'user delete successfully',
      deletedData: userDeleted,
    };
  }
}
