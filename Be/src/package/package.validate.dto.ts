import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name_package!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  detail_package!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration_days!: number;
}

export interface createPackagePromise {
  name_package: string;
  detail_package: string;
  price: number;
  duration_days: number;
}

export class UserUsePackageDto {
  @IsNotEmpty()
  @IsNumber()
  user_id!: number;

  @IsNotEmpty()
  @IsNumber()
  package_id!: number;

  @IsNotEmpty()
  @IsString()
  start_date!: string;
}

export interface userUsePackagePromise {
  id_user_use_package: number;
  id_user: number;
  id_package: number;
  start_date: Date;
  end_date: Date;
  status: string;
  created_at: Date;
}

export interface showUserTodayUsePackagePromise {
  user_id: number;
  first_name: string;
  last_name: string;
  usage_date: Date;
  total_internet_bytes: number | null;
  used_internet_bytes: number | null;
  total_call: number | null;
  used_call: number | null;
  created_at: Date;
}
