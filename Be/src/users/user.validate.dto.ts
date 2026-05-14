import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsBoolean,
} from 'class-validator';

export interface createUserPromise {
  id: number;
  first_name: string;
  last_name: string;
  tel: string;
  email: string;
  national_id: string;
  created_at: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  @Matches(/^[A-Za-zก-๙\s]+$/, {
    message:
      'first_name ต้องเป็นภาษาไทยหรืออังกฤษเท่านั้น ห้ามมีตัวเลขหรือสัญลักษณ์',
  })
  first_name!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  @Matches(/^[A-Za-zก-๙\s]+$/, {
    message:
      'last_name ต้องเป็นภาษาไทยหรืออังกฤษเท่านั้น ห้ามมีตัวเลขหรือสัญลักษณ์',
  })
  last_name!: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: 'tel ต้องเป็นตัวเลข 10 หลักเท่านั้น',
  })
  tel!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'email ไม่ถูกต้อง' })
  email!: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{13}$/, {
    message: 'national_id ต้องเป็นตัวเลข 13 หลักเท่านั้น',
  })
  national_id!: string;
}

export interface CreateAddressPromise {
  id: number;
  user_id: number;
  address_type: string;
  is_primary_address: boolean;
  address_line: string;
  district: string;
  sub_district: string;
  province: string;
  postal_code: string;
}

export class CreateAddressDto {
  @IsString()
  @Length(1, 20)
  address_type!: string;

  @IsBoolean()
  is_primary_address!: boolean;

  @IsString()
  @Length(1, 255)
  address_line!: string;

  @IsString()
  @Length(1, 100)
  district!: string;

  @IsString()
  @Length(1, 100)
  subdistrict!: string;

  @IsString()
  @Length(1, 100)
  province!: string;

  @IsString()
  @Length(1, 10)
  @Matches(/^[0-9]+$/, {
    message: 'postal_code ต้องเป็นตัวเลขเท่านั้น',
  })
  postal_code!: string;
}
