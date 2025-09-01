import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { checkoutAPI } from "@/api/product.api"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cartItems: any[]
}

export function PaymentDialog({ open, onOpenChange, cartItems }: PaymentDialogProps) {
  const checkoutMutation = useMutation({
    mutationFn: checkoutAPI.createStripeSession,
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url // 🔀 redirect to Stripe
      }
    },
    onError: () => {
      alert("Failed to start checkout. Please try again.")
    },
  })

  const handleCheckout = () => {
    if (!cartItems.length) return
    const payload = {
      cartItems: cartItems.map((item) => ({
        id: item.product._id,
        name: item.product.productName,
        price: item.product.productPrice,
        quantity: item.quantity,
        image: item.product.productImage,
      })),
    }
    checkoutMutation.mutate(payload)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            You will be securely redirected to Stripe Checkout to complete your payment.
          </p>
          <ul className="text-sm">
            {cartItems.map((item) => (
              <li key={item.product._id}>
                {item.product.productName} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCheckout} disabled={checkoutMutation.isPending}>
            {checkoutMutation.isPending ? "Redirecting..." : "Proceed to Pay"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
