import { useCartStore } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";
import { checkoutAPI } from "@/api/product.api";
import { PaymentDialog } from "../shared/PaymentDialog";

const Cart = () => {
  const { items: cart, removeFromCart, clearCart } = useCartStore();
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  // 🟢 Mutation for Stripe checkout session
  const checkoutMutation = useMutation({
    mutationFn: checkoutAPI.createStripeSession,
    onSuccess: (data) => {
      if (data?.url) {
        clearCart(); // optional: clear cart on successful session creation
        window.location.href = data.url; // Stripe checkout redirect
      }
    },
    onError: (err: any) => {
      console.error("Checkout failed", err);
      alert("Failed to start checkout. Please try again.");
    },
  });

  // 🔹 Derived cart values
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.productPrice * item.quantity,
    0
  );
  const gst = subtotal * 0.18; // demo GST
  const total = subtotal + gst;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const payload = {
      cartItems: cart.map((item) => ({
        id: item.product._id,
        name: item.product.productName,
        price: item.product.productPrice,
        quantity: item.quantity,
        image: item.product.productImage,
      })),
      automatic_tax: false,
    };

    checkoutMutation.mutate(payload);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
        <h3 className="text-lg font-semibold">Your cart is empty</h3>
        <Button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Cart items list */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.productImage}
                alt={item.product.productName}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.productName}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.product.productPrice.toLocaleString("en-IN")}
                </p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={clearCart}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Clear Cart
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal ({cartItemsCount} items)</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>GST (18%)</span>
          <span>₹{gst.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={checkoutMutation.isPending}
          className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
        >
          {checkoutMutation.isPending
            ? "Redirecting..."
            : "Proceed to Checkout"}
        </button>

        <PaymentDialog
          open={isPaymentOpen}
          onOpenChange={setPaymentOpen}
          cartItems={cart}
        />
      </div>
    </div>
  );
};

export default Cart;
