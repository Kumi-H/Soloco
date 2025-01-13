from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    email: str = Field(examples=["solo-example@gmail.com"])
    nickname: str = Field(examples=["ソロ活を極めたい女子"])
    age: str = Field(examples=["31~35歳"])


class UserUpdate(BaseModel):
    email: str = Field(examples=["solo-example@gmail.com"])
    nickname: str = Field(examples=["ソロ活を極めたい女子"])
    age: str = Field(examples=["31~35歳"])


class UserType(BaseModel):
    solo_level: str = Field(examples=["経験者"])
    activity_preference: str = Field(examples=["アウトドア派"])
    time_preference: str = Field(examples=["朝型"])
    is_planned: bool = Field(examples=[True])
    weekend_plan_preference: bool = Field(examples=[True])
    after_work_preference: str = Field(examples=["グルメ"])
    comfort_adventure: str = Field(examples=["刺激を求める"])


class UserResponse(BaseModel):
    email: str = Field(examples=["solo-example@gmail.com"])
    nickname: str = Field(examples=["ソロ活を極めたい女子"])
    age: str = Field(examples=["31~35歳"])
    solo_type: str = Field(examples=["アクティブチャレンジャー"])


class UserIdResponse(BaseModel):
    id: int = Field(examples=[1])


class UserTypeResponse(BaseModel):
    solo_type: str = Field(examples=["アクティブチャレンジャー"])
