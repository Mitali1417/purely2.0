import { styles } from "../../style/tailwindStyles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { Trash2, Heart, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const { 
    wishlist, 
    isInCart, 
    removeProductFromWishlist, 
    addProductToCart, 
    removeProductFromCart 
  } = useShoppingCart();

  const handleCartToggle = (product: any) => {
    if (isInCart(product.id)) {
      removeProductFromCart(product.id);
    } else {
      addProductToCart(product);
    }
  };

  return (
    <div className={`${styles.flexCenter} flex-col my-[1rem]`}>
      <div className={`${styles.flexCenter} flex-col bg-white/20 min-h-[95vh] w-full rounded-[1rem] p-8`}>
        {wishlist.length === 0 ? (
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500">Start adding products to your wishlist!</p>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-bold mb-8 mt-20">
              Wishlist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
              {wishlist.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => removeProductFromWishlist(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                    <p className="text-xl font-bold text-primary">
                      ${product.price}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <Button
                      onClick={() => handleCartToggle(product)}
                      className={`w-full ${
                        isInCart(product.id) 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
