/* eslint-disable prettier/prettier */
import { Body, Controller, Patch, Param, Post, Response, Delete, UseGuards, Res } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login Successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Invalid login credentials.' })
  async login(@Body() loginDto: LoginDto, @Response() res) {
    const user = await this.authService.validateLogin(loginDto);
    const token = await this.authService.login(loginDto);
    const secure = (process.env.NODE_ENV === "production")? true : false ; 
    res.cookie("access_token", token, { httpsOnly: true, secure: secure  });
    return res.status(200).send({
      user: user,
      token: token,
    });
  }
  @Post('signup')
  @ApiResponse({ status: 201, description: 'User Registration Successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Invalid register information.' })
  async register(@Body() registerDto: RegisterDto, @Response() res) {
    await this.authService.validateRegister(registerDto);
    const user = await this.authService.register(registerDto);
    return res.status(200).send(user);
  }

  @Delete('logout')
  @ApiResponse({ status: 201, description: 'Logout Successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async logout(@Res() res ) {
    res.clearCookie('access_token');
    return res.status(200).send('Logout success');
  }
}




