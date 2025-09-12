import React from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail,
  ShoppingCart,
  Heart,
  Loader2,
  AlertCircle,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initials = (name?: string) => {
  if (!name) return "U";
  const p = name.trim().split(" ");
  return (
    ((p[0]?.[0] ?? "") + (p[p.length - 1]?.[0] ?? "")).toUpperCase() || "U"
  );
};

const ProfileDialog: React.FC = () => {
  const { profile, isLoading, isError } = useUserProfile();
  const cart = useCartStore((s) => s.items);
  const wishlist = useCartStore((s) => s.wishlist);
  const totals = useCartStore((s) => ({
    total: s.cartTotal,
    count: s.cartItemCount,
    wcount: s.wishlistCount,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading profile...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center p-4 text-destructive">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span className="text-sm">Failed to load profile information</span>
      </div>
    );
  }

  const p: any = profile || {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 rounded-full hover:bg-accent/20 transition-colors"
        >
          <Avatar className="h-9 w-9 border-2 border-primary/10">
            <AvatarImage src={p.avatar} alt={p.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-medium !text-xs">
              {initials(p.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-primary">
            Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
          <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
            <AvatarImage src={p.avatar} alt={p.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-lg font-semibold">
              {initials(p.name)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-foreground flex items-center gap-2">
              {p.name || "Guest User"}
              <Badge variant="outline" className="text-xs font-normal">
                {p.id ? "Registered" : "Guest"}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-1" />
              {p.email || "No email provided"}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Shopping Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Shopping Activity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-primary/5 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Cart Items</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">
                    {totals.count()}
                  </span>
                  <span className="text-sm text-muted-foreground">items</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {cart.length > 0
                    ? "Ready for checkout"
                    : "Your cart is empty"}
                </div>
              </div>

              <div className="bg-pink-500/5 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium">Wishlist</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-pink-500">
                    {totals.wcount()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    saved items
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {wishlist.length > 0
                    ? "Items you love"
                    : "No saved items yet"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
