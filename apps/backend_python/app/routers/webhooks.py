from fastapi import APIRouter, status, Request, HTTPException
import stripe
import os
from dotenv import load_dotenv

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

router = APIRouter()


@router.post("/", tags=["webhook"], status_code=status.HTTP_200_OK)
async def webhook(request: Request):
    data = await request.body()
    stripe_signature = request.headers.get("stripe-signature")
    try:
        event = stripe.Webhook.construct_event(
            payload=data, sig_header=stripe_signature, secret=endpoint_secret
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid payload"
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid signature"
        )
    event_type = event["type"]
    if event_type == "checkout.session.completed":
        print("checkout completed!")
    
    return {"message": "Checkout completed"}