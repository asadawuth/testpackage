import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import {
  createPackagePromise,
  CreatePackageDto,
  showUserTodayUsePackagePromise,
  UserUsePackageDto,
} from './package.validate.dto';
import { ApiResponse } from '../common/apiresponse/api.response.dto';
import {
  PaginationDto,
  PaginationResult,
  paginate,
} from '../common/padination/pagination';

@Injectable()
export class PackageService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async createPackage(
    dto: CreatePackageDto,
  ): Promise<ApiResponse<createPackagePromise>> {
    const { name_package, detail_package, price, duration_days } = dto;

    const sql = `
    INSERT INTO package (
      name_package,
      detail_package,
      price,
      duration_days
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
  `;

    const result = await this.pool.query(sql, [
      name_package,
      detail_package,
      price,
      duration_days,
    ]);

    return new ApiResponse<createPackagePromise>(
      'Package created successfully',
      201,
      result.rows[0],
    );
  }

  async createUserUsePackage(dto: UserUsePackageDto) {
    const { user_id, package_id, start_date } = dto;
    const active = await this.pool.query(
      `
    SELECT 1 FROM user_subscription
    WHERE user_id = $1
      AND status = 'ใช้งาน'
  `,
      [user_id],
    );

    if (active.rows.length > 0) {
      throw new Error('User already has active package');
    }

    const pkg = await this.pool.query(
      `SELECT duration_days FROM package WHERE id = $1`,
      [package_id],
    );
    const duration = pkg.rows[0].duration_days;
    const startDate = start_date ? new Date(start_date) : new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration); // 4. insert
    const result = await this.pool.query(
      `
    INSERT INTO user_subscription (
      user_id,
      package_id,
      start_date,
      end_date,
      status,
      created_at
    )
    VALUES ($1,$2,$3,$4,'ใช้งาน',
      date_trunc('day', NOW() AT TIME ZONE 'Asia/Bangkok')
    )
    RETURNING *
  `,
      [user_id, package_id, startDate, endDate],
    );

    return {
      message: 'Subscribed successfully',
      data: result.rows[0],
    };
  }

  async showToDayUsePackage(
    first_name?: string,
    last_name?: string,
    date?: string,
    query?: PaginationDto,
  ): Promise<PaginationResult<showUserTodayUsePackagePromise>> {
    const { page = 1, limit = 10 } = query || {};
    const { offset } = paginate(page, limit);

    let baseSql = `
    FROM user_usage_history uh
    JOIN user_subscription us 
      ON us.id = uh.user_subscription_id
    JOIN users u 
      ON u.id = us.user_id
    WHERE 1=1
  `;

    const params: any[] = [];
    let index = 1;

    if (first_name) {
      baseSql += ` AND u.first_name ILIKE $${index++}`;
      params.push(`%${first_name}%`);
    }

    if (last_name) {
      baseSql += ` AND u.last_name ILIKE $${index++}`;
      params.push(`%${last_name}%`);
    }

    if (date) {
      baseSql += ` AND DATE(uh.created_at) = $${index++}`;
      params.push(date);
    }

    const dataSql = `
    SELECT 
      u.id AS user_id,
      u.first_name,
      u.last_name,
      DATE(uh.created_at) AS usage_date,
      uh.total_internet_bytes,
      uh.used_internet_bytes,
      uh.total_call,
      uh.used_call,
      uh.created_at
    ${baseSql}
    ORDER BY uh.created_at DESC
    LIMIT $${index++} OFFSET $${index++}
  `;

    const dataResult = await this.pool.query(dataSql, [
      ...params,
      limit,
      offset,
    ]);

    const countSql = `SELECT COUNT(*) ${baseSql}`;
    const countResult = await this.pool.query(countSql, params);

    return {
      data: dataResult.rows,
      total: Number(countResult.rows[0].count),
      page,
      limit,
    };
  }
}
