import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { bodyUser } from './user.controller';
@Injectable()
export class UserService {

  prisma = new PrismaClient()

  async getImageByUser(id: number) {
    try {
      let checkId = await this.prisma.users.findFirst({where: {user_id: id}})
      console.log('checkId: ', checkId);
      if(checkId){
        let images = await this.prisma.save.findMany({
          include:{
            users: true,
            images: true
          }, where: {user_id: id}
        })
        return images
      }else{
        throw new HttpException( {mess :"ID không tồn tại"},404)
      }
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);
    }

  }

async findOne(id: number) {
    try {
      let checkId = await this.prisma.users.findFirst({where: {user_id: id}})
      if(checkId){
        let {user_id, full_name, email, avatar} = checkId
        let dataUser = {user_id, full_name, email, avatar}
        return dataUser       
      }else{
        throw new HttpException( {mess :"ID không tồn tại"},404)
      }

    } catch (error) {
      throw new HttpException(error.response.mess, error.status);
    }

  }

  async getImageCreateByUser(id:number){
    try {
      console.log(id);
            
      let checkId = await this.prisma.users.findFirst({where: {user_id: id}})
      console.log('checkId: ', checkId);
      if(checkId){
        let images = await this.prisma.images.findMany({
          where: {user_id: id}
        })
        console.log('images: ', images);
        return images
      }else{
        throw new HttpException( {mess :"ID không tồn tại"},404)
      }
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);
    }
  }

  async updateUser(id: number, body: bodyUser,fileName){
    try {
      let checkUser = await this.prisma.users.findFirst({where: {user_id: id}})
      if(checkUser){
        let {desc,first_name,full_name,last_name,web} = body
        console.log(body.web);
        
        let newData = {...checkUser,desc,first_name,full_name,last_name,web,avatar:fileName}
        await this.prisma.users.update({data: newData, where:{user_id: id}})
        return "Update thành công"
      }else{
        throw new HttpException( {mess :"ID không tồn tại"},404)
      }     
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);
    }
  }
}
