import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/card";
import { ShinyButton } from "../../../components/magicui/shiny-button";

export const SaleBanner = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mx-auto pt-14">
        <Card
          className="bg-transparent relative"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/duju3bhds/image/upload/v1757324371/Untitled_design_3_e238kd.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1>Glow More, Spend Less</h1>
                {/* <span className="mb-2 inline-block">LIMITED TIME OFFER</span> */}
                {/* <h1 className="mb-4">Selfcare Just Got More Affordable</h1> */}
                <p>
                  Enjoy up to 50% off on our most-loved skincare essentials.
                  Gentle care, radiant results — it’s the perfect time to treat
                  yourself.
                </p>

                <ShinyButton onClick={() => navigate("/sale")}>
                  Shop Now
                </ShinyButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden md:block -mt-22 mr-6"
            >
              <img
                src="https://images.unsplash.com/photo-1591130901921-3f0652bb3915?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sale Products"
                className="w-xl h-auto object-cover aspect-video rounded-lg"
              />
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
};
