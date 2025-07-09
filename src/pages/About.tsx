
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-coffee-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About D'Kopi</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the story behind Indonesia's premium coffee powder brand
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2018, D'Kopi began with a simple mission: to bring the authentic taste of 
                Indonesian coffee to homes around the world. Our founder, Budi Santoso, grew up in a 
                family of coffee farmers in the highlands of Sumatra.
              </p>
              <p className="text-gray-600 mb-4">
                After years of working in the coffee industry and witnessing how middlemen often 
                shortchanged local farmers, Budi decided to create a brand that would work 
                directly with farmers, ensuring fair compensation while delivering exceptional 
                quality to consumers.
              </p>
              <p className="text-gray-600">
                Today, D'Kopi works with over 200 small-scale farmers across the Indonesian 
                archipelago, from Aceh to Papua, bringing you the diverse flavors of our 
                nation's coffee heritage.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Coffee plantation"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-coffee-dark">Sustainability</h3>
              <p className="text-gray-600">
                We believe in responsible farming practices that preserve the environment for 
                future generations. All our coffee is grown using sustainable methods that 
                protect the biodiversity of the regions where we operate.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-coffee-dark">Fair Trade</h3>
              <p className="text-gray-600">
                We pay our farmers above-market rates and invest in their communities. 
                We believe that great coffee should benefit everyone in the supply chain, 
                starting with the people who grow it.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-coffee-dark">Quality</h3>
              <p className="text-gray-600">
                From bean selection to roasting and packaging, we maintain strict quality control 
                standards at every step. We never compromise on the taste and aroma that make 
                D'Kopi special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coffee-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Join Our Coffee Journey</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Experience the authentic taste of Indonesian coffee and be part of our mission to 
            support local farmers and sustainable practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-coffee-accent hover:bg-coffee-medium">
              <Link to="/shop">Shop Our Coffee</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
