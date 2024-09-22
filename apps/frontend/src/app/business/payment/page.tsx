"use client";

import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-md px-6 py-10">
      <div className="bg-white p-10 rounded-2xl">
        <div className="container mx-auto px-4">
          <script async src="https://js.stripe.com/v3/buy-button.js"></script>
          <stripe-buy-button
            buy-button-id="buy_btn_1PxRFJRtrot4hWanNzim3DMV"
            publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          ></stripe-buy-button>
        </div>
      </div>
    </div>
  );
}
