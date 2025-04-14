from fastapi import Request
from typing import Any, List, Type
import math

def paginate(query, request: Request, pydantic_model: Type[Any], key: str = "items", status_code: int = 200, message: str = "Records fetched sucessfully!" ):
  try:
    per_page = int(request.query_params.get("perPage", 10))
    page = int(request.query_params.get("page", 1))
  except ValueError:
    per_page = 10
    page = 1

  per_page = max(1, per_page)
  page = max(1, page)

  total_records = query.count()
  skip = (page - 1) * per_page

  results: List[Any] = query.offset(skip).limit(per_page).all()

  total_pages = math.ceil(total_records / per_page)
  next_page = page + 1 if (page * per_page) < total_records else None
  prev_page = page - 1 if page > 1 else None

  serialized_results = [pydantic_model.from_orm(item) for item in results]

  return {
    "data": {
      key: serialized_results,
      "statusCode": status_code,
      "message": message,
      "pagination": {
        "totalRecords": total_records,
        "nextPage": next_page,
        "prevPage": prev_page,
        "totalPage": total_pages
      }
    }
  }
