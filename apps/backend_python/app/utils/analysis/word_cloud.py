from janome.tokenizer import Tokenizer
from wordcloud import WordCloud
from io import BytesIO
import base64
import os


def get_wordcloud(text):
    t = Tokenizer()

    s = []
    for token in t.tokenize(text):
        p = token.part_of_speech.split(",")
        if "名詞" in p:
            s.append(token.surface)

    font_path = os.path.join("app/static", "ipaexg.ttf")

    wc = WordCloud(
        width=600,
        height=400,
        background_color="white",
        colormap="PuRd",
        stopwords={"ため", "こと", "もの", "よう", "これ", "あれ", "の", "ところ"},
        font_path=font_path,
    )

    wc.generate(" ".join(s))
    wc.to_file("result-j.png")

    image_stream = BytesIO()
    wc.to_image().save(image_stream, format="PNG")
    image_stream.seek(0)
    base64_image = base64.b64encode(image_stream.read()).decode("utf-8")

    return base64_image
