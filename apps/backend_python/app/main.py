from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.logging_config import setup_logging
from app.routers import users, activities, reviews, webhooks


logger = setup_logging(__name__)

app = FastAPI(title="BC8 Final Project")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router, prefix="/users")
app.include_router(activities.router, prefix="/activities")
app.include_router(reviews.router, prefix="/reviews")
app.include_router(webhooks.router, prefix="/webhooks")
