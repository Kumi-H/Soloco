from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.users import User, SoloType
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserType,
    UserResponse,
    UserIdResponse,
    UserTypeResponse,
)
from app.utils.analysis.solo_type import get_solo_type_id
from app.core.logging_config import setup_logging

router = APIRouter()
logger = setup_logging(__name__)


# TODO: WIP MYページ機能追加時に作りこむ
@router.get(
    "/me", tags=["users"], response_model=UserResponse, status_code=status.HTTP_200_OK
)
def get_user_me(db: Session = Depends(get_db)):
    item = (
        db.query(
            User.email,
            User.nickname,
            User.age,
            SoloType.name.label("solo_type"),
        )
        .join(SoloType, User.solo_type_id == SoloType.id)
        .filter(User.email == "検討中")
        .first()
    )

    if not item:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Activity not found")

    return UserResponse.model_validate(item)


@router.post(
    "/",
    tags=["users"],
    response_model=UserIdResponse,
    status_code=status.HTTP_201_CREATED,
)
def post_user(item: UserCreate, db: Session = Depends(get_db)):
    try:
        user_item = User(**item.model_dump())
        nickname = db.query(User).filter(User.nickname == user_item.nickname).first()

        if nickname:
            raise HTTPException(status_code=409, detail="Conflict occurred")

        db.add(user_item)
        db.commit()
        db.refresh(user_item)

    except HTTPException as http_exception:
        logger.warning("Nickname already exists")
        raise http_exception

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    logger.info("User created")
    # TODO: ログ修正する
    # logger.debug("id", user_item.id) 
    return UserIdResponse(id=user_item.id)


@router.put(
    "/type-test/{user_id}",
    tags=["users"],
    response_model=UserTypeResponse,
    status_code=status.HTTP_200_OK,
)
def put_user_type(user_id: int, item: UserType, db: Session = Depends(get_db)):
    try:
        user_item = db.query(User).filter(User.id == user_id).first()

        if user_item is None:
            raise ValueError("User not found")

        solo_type_id = get_solo_type_id(item)
        solo_type_name = (
            db.query(SoloType.name).filter(SoloType.id == solo_type_id).scalar()
        )

        user_item.solo_level = item.solo_level
        user_item.activity_preference = item.activity_preference
        user_item.time_preference = item.time_preference
        user_item.is_planned = item.is_planned
        user_item.weekend_plan_preference = item.weekend_plan_preference
        user_item.after_work_preference = item.after_work_preference
        user_item.comfort_adventure = item.comfort_adventure
        user_item.solo_type_id = solo_type_id

        db.commit()
        db.refresh(user_item)

    except ValueError as ve:
        logger.warning(str(ve))
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=str(ve))

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    logger.info("User updated")
    # TODO: ログ修正する
    # logger.debug("solo_type", solo_type_name)
    return UserTypeResponse(solo_type=solo_type_name)


# TODO: WIP MYページ機能追加時に作りこむ
@router.put("/{user_id}", tags=["users"], status_code=status.HTTP_200_OK)
def put_user(user_id: int, item: UserUpdate, db: Session = Depends(get_db)):
    user_item = db.query(User).filter(User.id == user_id).first()

    if user_item is None:
        return {"message": "User not found"}, status.HTTP_404_NOT_FOUND

    user_item.id = user_id
    user_item.email = item.email
    user_item.age = item.age

    db.commit()
    db.refresh(user_item)

    return {"message": "User updated", "user": user_item}
