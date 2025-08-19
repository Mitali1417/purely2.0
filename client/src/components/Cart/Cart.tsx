import { styles } from "../../style/tailwindStyles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { Plus, Minus, X, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { 
    cart, 
    cartTotal, 
    removeProductFromCart, 
    updateProductQuantity, 
    clearCart 
  } = useShoppingCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateProductQuantity(productId, newQuantity);
  };

  return (
    <div className={`${styles.flexCenter} flex-col my-[1rem]`}>
      <div className={`${styles.flexCenter} flex-col bg-white/20 min-h-[95vh] w-full p-[2rem] rounded-[1rem]`}>
        {cart.length === 0 ? (
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500">Add some products to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-[5rem] w-full h-full">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="relative overflow-visible">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover bg-white rounded-lg p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 mb-2">
                            ${item.price}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="bg-primary text-white px-3 py-1 rounded-md font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <button
                      onClick={() => removeProductFromCart(item.id)}
                      className="absolute -left-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="bg-white text-primary h-fit">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total:</span>
                      <span className="text-xl font-bold text-primary">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Proceed to Checkout
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
