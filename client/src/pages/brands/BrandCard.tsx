import { useNavigate } from "react-router-dom";
import { useBrands } from "@/hooks/useBrands";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product.api";
import { getResizedImageUrl } from "@/utils/getResizedImageUrl";
import { motion } from "motion/react";
import { ChevronRight, Star } from "lucide-react";

interface Brand {
  name: string;
  count: number;
}

const BrandCard = ({ brand, index }: { brand: Brand; index: number }) => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate(`/brands/${encodeURIComponent(brand.name)}`);
  };

  // Fetch one sample product to get an image for background
  const { data: sampleData } = useQuery({
    queryKey: ["brand-sample-product", brand.name],
    queryFn: async () => {
      const res = await getProducts({ brand: brand.name, limit: 1 } as any);
      return Array.isArray(res) ? res : (res as any)?.products || [];
    },
    staleTime: 1000 * 60 * 10,
  });

  const sampleProduct =
    Array.isArray(sampleData) && sampleData.length > 0 ? sampleData[0] : null;
  const bgImage = sampleProduct?.productImage
    ? getResizedImageUrl(sampleProduct.productImage, 400, 240)
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group w-full"
    >
      <Card
        className="group cursor-pointer !px-0 py-0 h-56 overflow-hidden border-border transition-all duration-300 hover:shadow-lg"
        onClick={handleBrandClick}
      >
        <CardContent className="p-0 relative h-full">
          {bgImage && (
            <div className="absolute inset-0">
              <img
                src={bgImage}
                alt={brand.name}
                className="w-full h-full object-cover duration-700"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="relative z-10 flex flex-col justify-between p-2">
        <div className="text-center">
          <h5>{brand.name}</h5>
        </div>
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 !text-white px-2 py-1 rounded-full transition-all duration-500 ease-in-out text-xs cursor-pointer">
            Shop Now
            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const BrandCards = () => {
  const { data: brandsRaw, isLoading, error } = useBrands();

  // Ensure brands is an array of Brand objects
  const brands: Brand[] = Array.isArray(brandsRaw)
    ? brandsRaw.map((b: any) =>
        typeof b === "string"
          ? { name: b, count: 0 }
          : { name: b.name, count: b.count }
      )
    : [];

  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-3/4 mx-auto mb-3" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="text-center">
          <p className="text-destructive">
            Failed to load brands. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <div>
        <div className="text-center">
          <p className="text-muted-foreground">
            No brands available at the moment.
          </p>
        </div>
      </div>
    );
  }

  const filteredBrands: Brand[] = brands.filter(
    (brand: Brand) => brand.count >= 14
  );

  return (
    <div>
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2>Brands To Know</h2>
      </motion.div> */}

      {filteredBrands.length === 0 ? (
        <div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Star className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            No brands with 12+ products available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBrands.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandCards;

