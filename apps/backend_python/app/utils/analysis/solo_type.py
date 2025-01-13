from app.schemas.user import UserType


def get_solo_type_id(item: UserType):
    # scoreの並び順: [アクティブ, スペシャル, リラックス, グルメ]
    sum_score = [0, 0, 0, 0]

    if item.solo_level == "初心者":
        score_1 = [2, 1, 3, 4]
    else:
        score_1 = [3, 4, 2, 1]
    sum_score = [point + sum_point for point, sum_point in zip(score_1, sum_score)]

    if item.activity_preference == "インドア派":
        score_2 = [1, 2, 3, 4]
    else:
        score_2 = [4, 3, 2, 1]
    sum_score = [point + sum_point for point, sum_point in zip(score_2, sum_score)]

    if item.time_preference == "朝型":
        score_3 = [4, 2, 3, 1]
    else:
        score_3 = [1, 3, 2, 4]
    sum_score = [point + sum_point for point, sum_point in zip(score_3, sum_score)]

    if item.is_planned:
        score_4 = [3, 4, 1, 2]
    else:
        score_4 = [2, 1, 4, 3]
    sum_score = [point + sum_point for point, sum_point in zip(score_4, sum_score)]

    if item.weekend_plan_preference:
        score_5 = [4, 3, 2, 1]
    else:
        score_5 = [1, 2, 3, 4]
    sum_score = [point + sum_point for point, sum_point in zip(score_5, sum_score)]

    if item.after_work_preference == "おいしいものを食べて帰る":
        score_6 = [1, 3, 2, 4]
    else:
        score_6 = [3, 2, 4, 1]
    sum_score = [point + sum_point for point, sum_point in zip(score_6, sum_score)]

    if item.comfort_adventure == "安定を求める":
        score_7 = [2, 1, 4, 3]
    else:
        score_7 = [3, 4, 1, 2]
    sum_score = [point + sum_point for point, sum_point in zip(score_7, sum_score)]

    max_index = sum_score.index(max(sum_score))
    solo_type_id = max_index + 1

    return solo_type_id

    