
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-coffee-dark text-white">
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{
          backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20240731/pngtree-a-bag-of-coffee-on-plantation-image_16117211.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
      ></div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            Experience the Rich Flavor of Premium Coffee
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Indulge in the finest selection of premium coffee powder sourced from the best coffee farms across Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-coffee-accent hover:bg-coffee-medium text-white"
            >
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white bg-white/20 hover:bg-white/30"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
