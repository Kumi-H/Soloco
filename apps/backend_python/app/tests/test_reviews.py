from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


# TODO: GET reviews keywordなし正常系
# TODO: GET reviews keywordあり正常系
# TODO: GET reviews 404
# TODO: GET reviews 500

# TODO: GET report正常系
# TODO: GET report 404
# TODO: GET report 500

# TODO: GET report正常系
# TODO: GET report 404
# TODO: GET report 500


# TODO: POST reviews
# TODO: POST reviews 404
# TODO: POST reviews 500