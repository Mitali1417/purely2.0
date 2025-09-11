import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  name: string;
  role?: string;
  image?: string;
  content: string;
  rating: number;
  category: "skincare" | "haircare" | "general";
  product?: string;
}

export const Testimonials = ({
  testimonials: input,
}: {
  testimonials?: Testimonial[];
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(input || []);

  useEffect(() => {
    if (input && input.length) return;
    (async () => {
      try {
        const demo: Testimonial[] = [
          {
            name: "Sophia Williams",
            role: "Skincare Enthusiast",
            image:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            content:
              "The Vitamin C serum completely transformed my skin! After just 3 weeks, my dark spots have faded significantly and my complexion is brighter than ever. I've received so many compliments.",
            rating: 5,
            category: "skincare",
            product: "Vitamin C Brightening Serum",
          },
          {
            name: "James Wilson",
            role: "Barber & Grooming Expert",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            content:
              "As a barber, I'm very particular about hair products. This thickening shampoo gives incredible volume without weighing hair down. My clients love the natural finish it provides.",
            rating: 5,
            category: "haircare",
            product: "Volume Boost Thickening Shampoo",
          },
          {
            name: "Emma Chen",
            role: "Dermatology Student",
            image:
              "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
            content:
              "I've struggled with acne for years and this clarifying toner has been a game-changer. It keeps breakouts at bay without overdrying my skin. The ingredient list is clean and effective.",
            rating: 4,
            category: "skincare",
            product: "Clarifying BHA Toner",
          },
        ];
        setTestimonials(demo);
      } catch (_) {}
    })();
  }, [input]);

  return (
    <section>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-2 md:mb-4">
            <Quote className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2>Real Results, Real Reviews</h2>
        </motion.div>

        {/* Grid for medium and larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div
                className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                  testimonial.category === "skincare"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {testimonial.category === "skincare" ? "Skincare" : "Haircare"}
              </div>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  {testimonial.rating}/5
                </span>
              </div>
              <div className="relative mb-6">
                <Quote className="absolute -left-2 -top-2 h-6 w-6 text-primary/20" />
                <p className="text-foreground/90 relative z-10">
                  "{testimonial.content}"
                </p>
              </div>
              {testimonial.product && (
                <div className="mb-6">
                  <div className="text-xs text-muted-foreground">Product:</div>
                  <div className="text-sm font-medium text-primary">
                    {testimonial.product}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/10"
                />
                <div>
                  <p className="font-semibold text-foreground mb-0">
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
