import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';

export class bodyUser{
  @ApiProperty()
  first_name : string

  @ApiProperty()
  last_name :string

  @ApiProperty()
  desc: string

  @ApiProperty()
  web: string

  @ApiProperty()
  full_name: string
}
class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  hinh: any;
}

@ApiTags("user")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get danh sách ảnh đã lưu theo user ID
  @Get("image-by-userid/:userid")
  getImageByUser(@Param("userid") id: string) {
    return this.userService.getImageByUser(+id);
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.userService.findOne(+id);
  }

  @Get("image-create-by-userid/:userid")
  getImageCreateByUser(@Param("userid") id:string){   
    return this.userService.getImageCreateByUser(+id)
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("hinh",{
    storage: diskStorage({
      destination: process.cwd() + "/public/img/avatar",
      filename: (req,file,callback) => {
        // console.log('req: ', req);
      return  callback(null, new Date().getTime() + file.originalname)
      }
      
    })
  }))
  @Put("update-user/:userid")
  updateUser(@Param("userid") id:string,@Body() body:bodyUser, @UploadedFile() file:Express.Multer.File){
    let fileName = file.filename    
    return this.userService.updateUser(+id, body,fileName)
  }
}
