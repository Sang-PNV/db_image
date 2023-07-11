import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { type } from 'os';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';

export class body{
  @ApiProperty()
  search : string
}

export class bodyUpload{
  @ApiProperty()
  img_name : string
  @ApiProperty()
  img_desc: string
}
class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
@ApiTags("image")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // get all img
  @Get("get")
  findAll() {
    return this.imageService.findAll();
  }

  // search img by img name
  @Get('search-by-name')
  findImgByName(@Body() body:body) {
    return this.imageService.findImgByName(body);
  }

  // get img by id
  @Get("get-img-by-id/:imgId")
  getImgById(@Param("imgId") imgId: string){
    return this.imageService.getImgById(+imgId)
  }

  // get comment by id
  @Get("get-comment/:imgId")
  getCommentById(@Param("imgId") imgId:string){
    return this.imageService.getCommentById(+imgId)
  }

  //get save image
  @Get("save-image-yet/:userId/:imgId")
  getSaveImgYet(@Param("userId") userId:string, @Param("imgId") imgId:string){
    return this.imageService.getSaveImgYet(+userId,+imgId)
  }

  // post comment
  @Post("post-comment/:userId/:imgId")
  postComment(@Body() body, @Param("userId") userId:string, @Param("imgId") imgId:string){
    return this.imageService.postComment(body, +userId,+imgId)
  }

  // delete img by imgID
  @Delete("remove-img/:userid/:imgid")
  removeImg(@Param("userid") userid: string, @Param("imgid") imgid:string){
    return this.imageService.removeImg(+userid, +imgid)
  }

  // Post img by imgID
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("image",{
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req,file,callback) => callback(null, new Date().getTime() + file.originalname)
    })
  }))
  @Post("post-img/:userid")
  createImg(@Param("userid") id:string, @UploadedFile() file: Express.Multer.File, @Body() body:bodyUpload){   
    let fileName = file.filename
    console.log('fileName: ', fileName);
    return this.imageService.createImg(fileName,+id,body)
  }
}
