import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employees/employee.module';
import { UserModule } from './users/user.module';
import { VaccineModule } from './vaccines/vaccine.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors';
import { EmployeeVaccinationModule } from './employee-vaccinations/employee-vaccination.module';
import { RoleModule } from './roles/role.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    EmployeeModule,
    UserModule,
    RoleModule,
    VaccineModule,
    EmployeeVaccinationModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
