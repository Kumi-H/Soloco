from fastapi.testclient import TestClient
from fastapi import HTTPException
from app.main import app
from app.routers.activities import get_activities, get_activity
import pytest

client = TestClient(app)


def test_get_activities():
    response = client.get("/activities/category/1")
    assert response.status_code == 200
    assert response.json() == [
        {
            "activity_id": 1,
            "subcategory": "リムジン",
            "image": "no image",
            "provider_name": "OneRide Limousine",
            "time_zone": "夜",
            "solo_level": "上級",
            "likes_count": 10,
            "favorites_count": 20,
        }
    ]


# TODO: アクティビティが複数の場合


def test_get_activities_nonexistent_item():
    response = client.get("/activities/category/0")
    assert response.status_code == 404
    assert response.json() == {"detail": "Activity not found"}


def test_get_activities_exception(mocker):
    # dbセッションのモックを作成
    mock_db_session = mocker.MagicMock()

    mocker.patch("app.routers.activities.get_db", return_value=mock_db_session)
    mock_db_session.query.side_effect = Exception("DB Error")

    with pytest.raises(HTTPException) as exc_info:
        get_activities(1, mock_db_session)

    response = exc_info.value
    assert response.status_code == 500
    assert response.detail == "Internal server error"


def test_get_activity():
    response = client.get("/activities/1")
    assert response.status_code == 200
    assert response.json() == {
        "provider_name": "OneRide Limousine",
        "image_large": "no image",
        "title": "ソロリムジンといえばここ！特別な日のご褒美に",
        "description": "自由が丘駅から徒歩1分に位置する「OneRide Limousine」。豪華なレザーシートでくつろぎ、最新のエンタメを満喫しながら、まるで映画の主人公に。お一人さま専用のリムジンで、ちょっとしたセレブ気分を味わってください。特別な時間を「OneRide Limousine」でどうぞ！",
        "plan_name": "【新宿ALTA発】東京の夜景を独り占め！ソロリムジンプラン（ドレスコード付き）",
        "price": 25000,
        "image_small": "no image",
        "coupon_discount_rate": 10,
        "url": "https://star-limo.jp/",
    }


def test_get_activity_nonexistent_item():
    response = client.get("/activities/0")
    assert response.status_code == 404
    assert response.json() == {"detail": "Activity not found"}


def test_get_activity_exception(mocker):
    # dbセッションのモックを作成
    mock_db_session = mocker.MagicMock()

    mocker.patch("app.routers.activities.get_db", return_value=mock_db_session)
    mock_db_session.query.side_effect = Exception("DB Error")

    with pytest.raises(Exception) as exc_info:
        get_activity(1, mock_db_session)

    response = exc_info.value
    assert response.status_code == 500
    assert response.detail == "Internal server error"
