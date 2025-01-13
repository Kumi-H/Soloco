from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, index=True)
    nickname = Column(String, unique=True, nullable=False)
    age = Column(String, nullable=False)
    solo_level = Column(String)
    activity_preference = Column(String)
    time_preference = Column(String)
    is_planned = Column(Boolean)
    weekend_plan_preference = Column(Boolean)
    after_work_preference = Column(String)
    comfort_adventure = Column(String)
    solo_type_id = Column(Integer, ForeignKey("solo_types.id"))
    member_status = Column(String)
    free_member_created_at = Column(DateTime(timezone=True), default=func.now())
    premium_member_created_at = Column(DateTime(timezone=True))

    solo_types = relationship("SoloType", back_populates="users", uselist=False)
    reviews = relationship("Review", back_populates="users")


class SoloType(Base):
    __tablename__ = "solo_types"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)

    users = relationship("User", back_populates="solo_types")
