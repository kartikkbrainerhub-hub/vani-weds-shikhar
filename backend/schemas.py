from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime


class RSVPCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200, description="Full name of the guest")
    attending: bool = Field(..., description="Whether the guest is attending")
    message: Optional[str] = Field(None, max_length=1000, description="Optional message")
    guests: Optional[int] = Field(1, ge=1, le=10, description="Number of guests attending")

    @validator("name")
    def name_must_not_be_blank(cls, v):
        if not v.strip():
            raise ValueError("Name cannot be blank")
        return v.strip()

    @validator("message", pre=True, always=True)
    def sanitize_message(cls, v):
        if v:
            return v.strip()[:1000]
        return v


class RSVPResponse(BaseModel):
    id: int
    name: str
    attending: bool
    message: Optional[str]
    guests: int
    submitted_at: datetime

    class Config:
        from_attributes = True


class RSVPStats(BaseModel):
    total: int
    attending: int
    not_attending: int
    total_guests: int
