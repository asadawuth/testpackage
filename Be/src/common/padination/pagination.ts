export class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export function paginate(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
}
