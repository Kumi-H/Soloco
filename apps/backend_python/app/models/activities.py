from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

from app.database.database import Base


# TODO: image_thumbnailを後から追加したため位置が最終列になっている。カラム位置の変更方法がわかったら修正する。
class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    coupon_discount_rate = Column(Integer, nullable=False)
    image_large = Column(String, nullable=False)
    image_small = Column(String, nullable=False)
    time_zone = Column(String, nullable=False)
    solo_level = Column(String, nullable=False)
    likes_count = Column(Integer, default=0)
    favorites_count = Column(Integer, default=0)
    provider_id = Column(
        Integer, ForeignKey("providers.id"), index=True, nullable=False
    )
    activity_category_id = Column(
        Integer, ForeignKey("activity_categories.id"), index=True, nullable=False
    )
    activity_subcategory_id = Column(
        Integer, ForeignKey("activity_subcategories.id"), index=True, nullable=False
    )
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
    image_thumbnail = Column(String, nullable=False)

    providers = relationship("Provider", back_populates="activities", uselist=False)
    activity_categories = relationship(
        "ActivityCategory", back_populates="activities", uselist=False
    )
    activity_subcategories = relationship(
        "ActivitySubcategory", back_populates="activities", uselist=False
    )


class ActivityCategory(Base):
    __tablename__ = "activity_categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)

    activity_subcategories = relationship(
        "ActivitySubcategory", back_populates="activity_categories"
    )

    activities = relationship("Activity", back_populates="activity_categories")


class ActivitySubcategory(Base):
    __tablename__ = "activity_subcategories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    activity_category_id = Column(
        Integer, ForeignKey("activity_categories.id"), nullable=False
    )

    activity_categories = relationship(
        "ActivityCategory", back_populates="activity_subcategories"
    )

    activities = relationship("Activity", back_populates="activity_subcategories")
