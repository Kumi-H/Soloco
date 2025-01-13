from typing import List
from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.providers import Provider
from app.models.activities import Activity, ActivitySubcategory
from app.schemas.activity import ActivityCategoryResponse, ActivityResponse
from app.core.logging_config import setup_logging


router = APIRouter()
logger = setup_logging(__name__)


@router.get(
    "/category/{category_id}",
    tags=["activities"],
    response_model=List[ActivityCategoryResponse],
    status_code=status.HTTP_200_OK,
)
def get_activities(category_id: int, db: Session = Depends(get_db)):
    try:
        items = (
            db.query(
                Activity.id.label("activity_id"),
                ActivitySubcategory.name.label("subcategory"),
                Activity.image_thumbnail.label("image"),
                Provider.name.label("provider_name"),
                Activity.time_zone,
                Activity.solo_level,
                Activity.likes_count,
                Activity.favorites_count,
            )
            .join(
                ActivitySubcategory,
                Activity.activity_subcategory_id == ActivitySubcategory.id,
            )
            .join(Provider, Activity.provider_id == Provider.id)
            .filter(Activity.activity_category_id == category_id)
            .all()
        )

        if not items:
            raise ValueError("Activity not found")

    except ValueError as ve:
        logger.warning(str(ve))
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=str(ve))

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    logger.info("Get activities")
    logger.debug(items)
    return [ActivityCategoryResponse.model_validate(item) for item in items]


@router.get(
    "/{activity_id}",
    tags=["activities"],
    response_model=ActivityResponse,
    status_code=status.HTTP_200_OK,
)
def get_activity(activity_id: int, db: Session = Depends(get_db)):
    try:
        item = (
            db.query(
                Provider.name.label("provider_name"),
                Activity.image_large,
                Activity.title,
                Activity.description,
                Activity.name.label("plan_name"),
                Activity.price,
                Activity.image_small,
                Activity.coupon_discount_rate,
                Provider.url,
            )
            .join(Provider, Activity.provider_id == Provider.id)
            .filter(Activity.id == activity_id)
            .first()
        )

        if not item:
            raise ValueError("Activity not found")

    except ValueError as ve:
        logger.warning(str(ve))
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=str(ve))

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    logger.info("Get activity")
    logger.debug(item)
    return ActivityResponse.model_validate(item)
