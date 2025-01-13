import matplotlib.pyplot as plt
import japanize_matplotlib  # noqa: F401
import pandas as pd
from io import BytesIO
import base64


def get_age_count(data):
    df = pd.DataFrame(data)

    fig, ax = plt.subplots(figsize=(6, 6))
    ax.barh(df["x"], df["y"], color="violet")
    # ax.set(title="年齢別クチコミ投稿数")

    image_stream = BytesIO()
    plt.savefig(image_stream, format="png")
    image_stream.seek(0)
    base64_image = base64.b64encode(image_stream.read()).decode("utf-8")

    return base64_image
