from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime


class ReviewResponse(BaseModel):
    id: int = Field(examples=[1])
    nickname: str = Field(examples=["ソロ活を極めたい女子"])
    text: str = Field(
        examples=[
            "ひとりサンリオピューロランドに行ってきた〜！キティちゃんは平和の象徴。"
        ]
    )
    image: str
    likes_count: int
    favorites_count: int
    update_date: datetime

    model_config = ConfigDict(from_attributes=True, extra="ignore")


class ReviewReportResponse(BaseModel):
    wordcloud: str
    age_count: str
    llm: str


class ReviewItem(BaseModel):
    text: str = Field(
        examples=[
            "ひとりサンリオピューロランドに行ってきた〜！キティちゃんは平和の象徴。"
        ]
    )
    image: str


class ReviewReportItem(BaseModel):
    text: str = Field(
        examples=[
            "ひとりサンリオピューロランドに行ってきた〜！キティちゃんは平和の象徴。"
        ]
    )
    age: str = Field(examples=["31~35歳"])
    update_date: datetime

    model_config = ConfigDict(from_attributes=True, extra="ignore")
