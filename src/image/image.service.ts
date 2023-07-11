import { HttpException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
import { body, bodyUpload } from './image.controller';
@Injectable()
export class ImageService {
  prisma = new PrismaClient()

  // get all img
  async findAll() {    
    try {
      let images = await this.prisma.images.findMany()
      return images;
    } catch (error) {
      throw new HttpException (`Lỗi BE: ${error}`,500)
    }
  }

  // search img by img name
  async findImgByName(body:body) {
    try {
      let images = await this.prisma.images.findMany({
        where: {
          img_name: {contains : body.search}
        }
      })
      return images;
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);
    }
  }

  // get img by id
  async getImgById(imgId: number){
    try {
      let checkImgId = await this.prisma.images.findFirst({
        where: {
          img_id: imgId
        }
      })
      if(checkImgId){
        let images = await this.prisma.images.findMany({
          include: {
            users: true
          },where:{
            img_id: imgId
          }
        })
        return images
      }else{
        throw new HttpException( {mess :"ID ảnh không tồn tại"},404)
      }
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);   
    }
  }

  // get comment by id
  async getCommentById(imgId:number){
    try {
      let checkImgId = await this.prisma.images.findFirst({
        where: {
          img_id: imgId
        }
      })
      if(checkImgId){
        let comments = await this.prisma.comments.findMany({
          where:{
            img_id: imgId
          }, include:{
            users: true
          }
        })
        return comments
      }else{
        throw new HttpException( {mess :"ID ảnh không tồn tại"},404)
      }
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);    
    }
  }

  //get save image
  async getSaveImgYet(userId:number, imgId:number){
    try {
      let checkUserId = await this.prisma.users.findFirst({
        where: {user_id: userId}
      })
      if(checkUserId){
        let checkImgId = await this.prisma.images.findFirst({
          where:{ img_id : imgId}
        })
        if(checkImgId){
          let checkSaveImg = await this.prisma.save.findMany({
            where:{img_id: imgId}
          })
          if(checkSaveImg.length > 0){
            let saveImgByUser = []
            for(let i = 0; i < checkSaveImg.length; i++){           
              if(checkSaveImg[i].user_id == userId){
                saveImgByUser.push(checkSaveImg[i])
              }
            }
            if(saveImgByUser.length > 0){
              return saveImgByUser
            }else{
              return "User chưa save hình"
            }
          }else{
            return "User chưa save hình"
          }
        }else{
          throw new HttpException( {mess :"ID ảnh không tồn tại"},404)
        }
      }else{
        throw new HttpException( {mess :"ID user không tồn tại"},404)
      }
    } catch (error) {
      throw new HttpException(error.response.mess, error.status); 
    }
  }

  //post comment
  async postComment(body, userId, imgId){
    try {
      let checkUserId = await this.prisma.users.findFirst({
        where: {user_id: userId}
      })
      if(checkUserId){
        let checkImgId = await this.prisma.images.findFirst({
          where:{ img_id : imgId}
        })
        if(checkImgId){
          let {cmt_date, content} = body
          cmt_date = new Date(cmt_date)
          await this.prisma.comments.create({data: {cmt_date, content, user_id: userId, img_id: imgId}})
          return{message: "Comment thành công",data:{cmt_date, content}}
        }else{
          throw new HttpException( {mess :"ID ảnh không tồn tại"},404)
        }
      }else{
        throw new HttpException( {mess :"ID user không tồn tại"},404)
      }
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);  
    }
  }

  // delete img
  async removeImg(userid:number, imgid: number){
    try {
      let checkUser = await this.prisma.users.findFirst({where: {user_id: userid}})
      let checkImg = await this.prisma.images.findFirst({where: {img_id: imgid}})
      if(checkUser && checkImg){
        console.log('checkImg: ', checkImg);
        console.log('checkUser: ', checkUser);
        if(checkImg.user_id == checkUser.user_id){
          await this.prisma.images.delete({where: {img_id: imgid}})
          return "Xóa thành công"
        }else{
          return `Ảnh không thuộc sở hữu của user-id: ${userid}`
        }
      }else{
        throw new HttpException( {mess :"ID user hoặc ID ảnh không tồn tại"},404)
      }      
    } catch (error) {
      throw new HttpException(error.response.mess, error.status);
    }
  }

  // post img
 async createImg(fileName,id:number,body:bodyUpload){
  try {
    let checkUser = await this.prisma.users.findFirst({where:{user_id: id}})
    if(checkUser){
      let {img_desc,img_name} = body
      let newImg = {img_desc, img_name, user_id: id, url: fileName}
      await this.prisma.images.create({data: newImg})
      return "Upload ảnh thành công"
    }else{
      throw new HttpException( {mess :"ID user không tồn tại"},404)
    }
  } catch (error) {
    throw new HttpException(error.response.mess, error.status);
  }
  }
}
