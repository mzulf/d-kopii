
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialSection from "@/components/TestimonialSection";
import products from "@/data/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <FeaturedProducts products={products} />
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Coffee farmers"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Our Coffee Story</h2>
              <p className="text-gray-600 mb-4">
                At D'Kopi, we believe that great coffee starts with great beans. We work directly with local Indonesian farmers who share our passion for quality coffee.
              </p>
              <p className="text-gray-600 mb-6">
                From the highlands of Aceh to the volcanic slopes of Java, each of our coffee varieties is carefully selected, ethically sourced, and roasted to perfection to bring out its unique character and flavor profile.
              </p>
              <Button asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialSection />
      
      {/* Newsletter Section */}
      <section className="py-16 bg-coffee-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Join Our Coffee Club</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive coffee brewing tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md flex-1 text-foreground"
            />
            <Button className="bg-coffee-accent hover:bg-coffee-medium">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
