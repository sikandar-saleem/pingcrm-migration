from typing import Generic, TypeVar, List, Optional
from pydantic import BaseModel
from pydantic.generics import GenericModel

T = TypeVar("T")

class PaginationMeta(BaseModel):
    totalRecords: int
    nextPage: Optional[int]
    prevPage: Optional[int]
    totalPage: int

class PaginatedResponse(GenericModel, Generic[T]):
    data: dict
