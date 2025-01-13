from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Request
from app.database.database import get_db
from sqlalchemy.orm import Session
from app.models.users import User
from app.models.reviews import Review
from app.schemas.review import (
    ReviewResponse,
    ReviewItem,
    ReviewReportResponse,
    ReviewReportItem,
)
from app.utils.analysis.word_cloud import get_wordcloud
from app.utils.analysis.age_count import get_age_count
from app.utils.analysis.llm import get_llm_analysis
from app.core.auth import admin
from firebase_admin.auth import verify_id_token
from app.core.logging_config import setup_logging

router = APIRouter()
logger = setup_logging(__name__)


@router.get(
    "/",
    tags=["reviews"],
    response_model=List[ReviewResponse],
    status_code=status.HTTP_200_OK,
)
def get_reviews(db: Session = Depends(get_db), keyword: str = ""):
    try:
        reviews_query = db.query(
            Review.id,
            User.nickname,
            Review.text,
            Review.image,
            Review.likes_count,
            Review.favorites_count,
            Review.updated_at.label("update_date"),
        ).join(User, Review.user_id == User.id)

        if keyword:
            reviews_query = reviews_query.filter(Review.text.like(f"%{keyword}%"))

        items = reviews_query.all()
        if not items:
            raise ValueError("Reviews not found")

    except ValueError as ve:
        logger.warning(str(ve))
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=str(ve))

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    logger.info("Get reviews")
    logger.debug(items)
    return [ReviewResponse.model_validate(item) for item in items]


@router.get(
    "/report",
    tags=["reviews"],
    response_model=ReviewReportResponse,
    status_code=status.HTTP_200_OK,
)
def get_report(db: Session = Depends(get_db), keyword: str = ""):
    try:
        reviews_query = db.query(
            Review.text,
            User.age,
            Review.updated_at.label("update_date"),
        ).join(User, Review.user_id == User.id)

        if keyword:
            reviews_query = reviews_query.filter(Review.text.like(f"%{keyword}%"))

        items = reviews_query.all()
        if not items:
            raise ValueError("Reviews not found")

        unknown = reviews_query.filter(User.age == "unknown").count()
        age18 = reviews_query.filter(User.age == "18-20").count()
        age21 = reviews_query.filter(User.age == "21-25").count()
        age26 = reviews_query.filter(User.age == "26-30").count()
        age31 = reviews_query.filter(User.age == "31-35").count()
        age36 = reviews_query.filter(User.age == "36-40").count()
        age41 = reviews_query.filter(User.age == "41-45").count()
        age46 = reviews_query.filter(User.age == "46-50").count()
        age51 = reviews_query.filter(User.age == "51-55").count()
        age56 = reviews_query.filter(User.age == "56-60").count()
        age61 = reviews_query.filter(User.age == "61-65").count()
        age66 = reviews_query.filter(User.age == "66+").count()

        age_data = {
            "x": [
                "不明",
                "18〜20歳",
                "21〜25歳",
                "26〜30歳",
                "31〜35歳",
                "36〜40歳",
                "41〜45歳",
                "46〜50歳",
                "51〜55歳",
                "56〜60歳",
                "61〜65歳",
                "66歳以上",
            ],
            "y": [
                unknown,
                age18,
                age21,
                age26,
                age31,
                age36,
                age41,
                age46,
                age51,
                age56,
                age61,
                age66,
            ],
        }

        age_count_img = get_age_count(age_data)

        review_results = [ReviewReportItem.model_validate(item) for item in items]
        concatenated_texts = " ".join(result.text for result in review_results)
        llm_text = get_llm_analysis(concatenated_texts, keyword)
        wordcloud_img = get_wordcloud(concatenated_texts)

    except ValueError as ve:
        logger.warning(str(ve))
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=str(ve))

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    return ReviewReportResponse(
        wordcloud=wordcloud_img, age_count=age_count_img, llm=llm_text
    )


@router.post("/", tags=["reviews"], status_code=status.HTTP_201_CREATED)
def post_review(item: ReviewItem, request: Request, db: Session = Depends(get_db)):
    try:
        token = request.headers.get("authorization")
        if token is None:
            raise ValueError("Token not found")

        token = token.split()[1]

        try:
            admin()
            decoded_token = verify_id_token(token)
        except Exception as e:
            logger.exception("Raise Exception: %s", str(e))
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials.",
            )

        email = decoded_token["email"]
        logger.debug(decoded_token)
        logger.debug(email)

        user_item = db.query(User).filter(User.email == email).first()

        if user_item is None:
            raise ValueError("User not found")

        db_review = Review(user_id=user_item.id, text=item.text, image=item.image)
        logger.debug(db_review)

        db.add(db_review)
        db.commit()
        db.refresh(db_review)

    except ValueError as ve:
        logger.warning(str(ve))
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=str(ve))

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    logger.info("Review created")
    return {"message": "Review created"}


# TODO: MYページ機能を追加時に作りこむ
@router.put("/{review_id}", tags=["reviews"], status_code=status.HTTP_200_OK)
def put_review(review_id: int, item: ReviewItem, db: Session = Depends(get_db)):
    try:
        db_review = db.query(Review).filter(Review.id == review_id).first()

        if db_review is None:
            raise ValueError("Review not found")

        db_review.text = item.text
        db_review.image = item.image
        db.commit()
        db.refresh(db_review)

    except ValueError as ve:
        logger.warning(str(ve))
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=str(ve))

    except Exception as e:
        logger.exception("Raise Exception: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    logger.info("Review updated")
    logger.debug("id", review_id)
    return {"message": "Review updated", "review": db_review}
