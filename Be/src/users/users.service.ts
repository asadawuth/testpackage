import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import {
  CreateUserDto,
  createUserPromise,
  CreateAddressDto,
  CreateAddressPromise,
} from './user.validate.dto';
import { ApiResponse } from '../common/apiresponse/api.response.dto';
import {
  PaginationDto,
  PaginationResult,
  paginate,
} from '../common/padination/pagination';

@Injectable()
export class UsersService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<ApiResponse<createUserPromise>> {
    const { first_name, last_name, tel, email, national_id } = createUserDto;

    const sql = `
    INSERT INTO users 
    (first_name, last_name, tel, email, national_id, created_at)
    VALUES ($1,$2,$3,$4,$5,
      date_trunc('second', NOW() AT TIME ZONE 'Asia/Bangkok')
    )
    RETURNING 
      id,
      first_name,
      last_name,
      tel,
      email,
      national_id,
      to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
  `;

    const values = [first_name, last_name, tel, email, national_id];

    const result = await this.pool.query(sql, values);
    return new ApiResponse<createUserPromise>(
      'User registered successfully',
      201,
      result.rows[0],
    );
  }

  async createAddress(
    userId: number,
    createAddressDto: CreateAddressDto,
  ): Promise<ApiResponse<CreateAddressPromise>> {
    const {
      address_type,
      is_primary_address,
      address_line,
      subdistrict,
      district,
      province,
      postal_code,
    } = createAddressDto;

    const sql = `
    INSERT INTO user_address
    (
      user_id,
      address_type,
      is_primary_address,
      address_line,
      sub_district,
      district,
      province,
      postal_code
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `;

    const values = [
      userId,
      address_type,
      is_primary_address,
      address_line,
      subdistrict,
      district,
      province,
      postal_code,
    ];

    const result = await this.pool.query(sql, values);

    return new ApiResponse<CreateAddressPromise>(
      'Address created successfully',
      201,
      result.rows[0],
    );
  }

  async allUsers(
    query: PaginationDto,
  ): Promise<PaginationResult<createUserPromise>> {
    const { page = 1, limit = 10 } = query;
    const { offset } = paginate(page, limit);
    const dataSql = `
    SELECT *
    FROM users
    ORDER BY id DESC
    LIMIT $1 OFFSET $2
  `;
    const countSql = `
    SELECT COUNT(*) as total
    FROM users
  `;
    const [dataResult, countResult] = await Promise.all([
      this.pool.query(dataSql, [limit, offset]),
      this.pool.query(countSql),
    ]);
    return {
      data: dataResult.rows,
      total: Number(countResult.rows[0].total),
      page,
      limit,
    };
  }

  async newUserDay(date: string, query: PaginationDto) {
    const { page = 1, limit = 12 } = query;
    const offset = (page - 1) * limit;
    const dataSql = `
    SELECT 
      u.id,
      u.first_name,
      u.last_name,
      u.tel,
      u.email,
      u.national_id,
      u.created_at,
      us.start_date,
      us.end_date,
      us.status,
      p.name_package,
      p.detail_package,
      p.price,
      p.duration_days
    FROM users u
    LEFT JOIN user_subscription us
      ON u.id = us.user_id
    LEFT JOIN package p
      ON p.id = us.package_id
    WHERE DATE(u.created_at) = $1
    ORDER BY u.id ASC
    LIMIT $2 OFFSET $3
  `;
    const countSql = `
    SELECT COUNT(*) as total
    FROM users u
    WHERE DATE(u.created_at) = $1
  `;
    const [dataResult, countResult] = await Promise.all([
      this.pool.query(dataSql, [date, limit, offset]),
      this.pool.query(countSql, [date]),
    ]);
    return {
      data: dataResult.rows,
      total: Number(countResult.rows[0].total),
      page,
      limit,
    };
  }

  async deleteAddressUser(id: number) {
    const sql = `
    DELETE FROM user_address
    WHERE id = $1
    RETURNING *
  `;

    await this.pool.query(sql, [id]);
    return new ApiResponse<createUserPromise>(
      'Delete AddressUser successfully',
      200,
    );
  }

  async deleteUser(id: number) {
    const sql = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
  `;
    await this.pool.query(sql, [id]);
    return new ApiResponse<createUserPromise>(
      'Delete IdUser successfully',
      201,
    );
  }

  async userAddress(id: number) {
    const sql = `
    SELECT *
    FROM users u
    JOIN user_address ud
      ON u.id = ud.user_id
    WHERE u.id = $1
  `;
    const result = await this.pool.query(sql, [id]);
    return result.rows;
  }
}
