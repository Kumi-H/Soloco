from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


# TODO: email,nicknameを動的にする
def test_post_user():
    response = client.post(
        "/users/",
        json={"email": "example-26@soloco.com", "nickname": "test26", "age": "31-35"},
    )

    response_data = response.json()
    assert response.status_code == 201
    assert "id" in response_data

    # # idが整数であるか確認
    assert isinstance(response_data["id"], int)


def test_post_users_existing_user():
    response = client.post(
        "/users/",
        json={
            "email": "example-90@soloco.com",
            "nickname": "ソロ活を極めたい女子",
            "age": "31-35",
        },
    )
    assert response.status_code == 409
    assert response.json() == {"detail": "Conflict occurred"}


# FIXME: 修正する
def test_post_users_exception(mocker):
    # dbセッションのモックを作成
    mock_db_session = mocker.MagicMock()
    mocker.patch("app.routers.users.get_db", return_value=mock_db_session)
    mock_db_session.query.side_effect = Exception("DB Error")

    response = client.post(
        "/users/",
        json={
            "email": "example-100@soloco.com",
            "nickname": "test100",
            "age": "31-35",
        },
    )
    assert response.status_code == 500
    data = response.json()
    assert data["detail"] == "Internal server error"


# FIXME: 修正する
def test_put_users():
    response = client.put(
        "/users/type-test/1",
        json={
            "solo_level": "経験者",
            "activity_preference": "アウトドア派",
            "time_preference": "朝型",
            "is_planned": True,
            "weekend_plan_preference": True,
            "after_work_preference": "グルメ",
            "comfort_adventure": "刺激を求める",
        },
    )
    assert response.status_code == 200
    assert response.json() == {"solo_type": "アクティブチャレンジャー"}


def test_put_users_nonexistent_user():
    response = client.put(
        "/users/type-test/0",
        json={
            "solo_level": "経験者",
            "activity_preference": "アウトドア派",
            "time_preference": "朝型",
            "is_planned": True,
            "weekend_plan_preference": True,
            "after_work_preference": "グルメ",
            "comfort_adventure": "刺激を求める",
        },
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}


# FIXME: 修正する
def test_put_users_exception(mocker):
    # dbセッションのモックを作成
    mock_db_session = mocker.MagicMock()

    mocker.patch("app.routers.users.get_db", return_value=mock_db_session)
    mock_db_session.query.side_effect = Exception("DB Error")

    response = client.put(
        "/users/type-test/1",
        json={
            "solo_level": "経験者",
            "activity_preference": "アウトドア派",
            "time_preference": "朝型",
            "is_planned": True,
            "weekend_plan_preference": True,
            "after_work_preference": "グルメ",
            "comfort_adventure": "刺激を求める",
        },
    )

    assert response.status_code == 500
    data = response.json()
    assert data["detail"] == "Internal server error"
