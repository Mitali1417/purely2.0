/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCartStore } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useCallback } from "react";
import { checkoutAPI } from "@/api/product.api";
import { Card } from "@/components/ui/card";
import { ShoppingCart, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { getResizedImageUrl } from "@/utils/getResizedImageUrl";
import { toast } from "sonner";

const Cart = () => {
  const { items, clearCart, cartTotal, cartItemCount, removeFromCart } =
    useCartStore();

  const checkoutMutation = useMutation({
    mutationFn: checkoutAPI.createStripeSession,
    onSuccess: (data) => {
      if (data?.url) {
        clearCart();
        window.location.href = data.url;
      }
    },
    onError: (err: any) => {
      console.error("Checkout failed", err);
      toast.error("Failed to start checkout. Please try again.");
    },
  });

  const subtotal = useMemo(() => cartTotal(), [cartTotal]);
  const itemCount = useMemo(() => cartItemCount(), [cartItemCount]);

  const discountTotal = useMemo(() => {
    return items.reduce((acc, item) => {
      if (item.product) {
        const discount = (item.product.originalPrice || 0) - (item.product.discountPrice || 0);
        return acc + (discount > 0 ? discount * item.quantity : 0);
      }
      return acc;
    }, 0);
  }, [items]);

  const gst = useMemo(() => (subtotal - discountTotal) * 0.18, [subtotal, discountTotal]);
  const finalTotal = useMemo(() => subtotal - discountTotal + gst, [subtotal, discountTotal, gst]);

  const handleCheckout = useCallback(() => {
    if (!items?.length) return;
    checkoutMutation.mutate({
      cartItems: items
        .filter((i) => i.product)
        .map((i) => ({
          id: i.productId,
          name: i.product?.productName || "Unknown",
          price: i.product?.discountPrice || i.product?.productPrice || 0,
          quantity: i.quantity,
          image: i.product?.productImage || "",
        })),
    });
  }, [checkoutMutation, items]);

  if (!items?.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/60" />
          <div className="absolute -inset-4 bg-primary/5 rounded-full" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          Your cart is empty
        </h2>
        <p className="mb-6 text-muted-foreground">
          Looks like you haven't added anything yet.
        </p>
        <Button onClick={() => window.history.back()}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-6">
        <AnimatePresence>
          {items.map((item) =>
            item.product ? (
              <Card key={item.productId}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <div className="relative">
                    <img
                      src={getResizedImageUrl(
                        item.product.productImage,
                        80,
                        80
                      )}
                      alt={item.product.productName}
                      className="h-16 w-16 object-cover rounded-md cursor-pointer"
                    />
                    {item.quantity > 1 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 space-y-1 ">
                    <p className="text-muted-foreground">{item.product.productName}</p>
                    <div className="flex items-center gap-2">
                      <h5 className="text-muted-foreground">
                        ₹{item.product.discountPrice?.toLocaleString("en-IN")}
                      </h5>
                      {item.product.originalPrice &&
                        item.product.originalPrice > item.product.discountPrice && (
                          <>
                            <span className="text-sm line-through text-muted-foreground">
                              ₹{item.product.originalPrice?.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs bg-green-600 py-0.5 px-2 rounded-full font-medium text-white">
                              {Math.round(
                                ((item.product.originalPrice -
                                  item.product.discountPrice) /
                                  item.product.originalPrice) *
                                  100
                              )}
                              % off
                            </span>
                          </>
                        )}
                    </div>
                    <span className="text-xs text-muted-foreground">Quantity: {item.quantity}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.productId)}
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </Card>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Order Summary */}
      <div className="md:col-span-1">
        <Card className="p-6 space-y-4 sticky top-6 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
              <span className="text-muted-foreground">₹{subtotal?.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600">
                -₹{discountTotal?.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span className="text-muted-foreground">₹{gst?.toLocaleString("en-IN")}</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-foreground">
              <span className="text-muted-foreground">Total</span>
              <span className="text-muted-foreground">₹{finalTotal?.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <Button
            className="w-full mt-4"
            onClick={handleCheckout}
            disabled={!items?.length || checkoutMutation.isPending}
            size="lg"
          >
            {checkoutMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Proceed to Checkout"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
