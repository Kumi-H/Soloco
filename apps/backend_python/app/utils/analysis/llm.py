from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()


def get_llm_analysis(text, topics):
    template = """与えられたテキストはひとりで活動したユーザーのクチコミです。
    「{keyword}」を含むクチコミの傾向を分析してください。
    100字～200字以内で出力してください。
    テキスト: {review} 
 """

    llm = OpenAI()

    prompt_template = PromptTemplate(
        input_variables=["review"],
        template=template,
    )

    formatted_prompt = prompt_template.format(review=text, keyword=topics)

    response = llm(formatted_prompt)

    return response
