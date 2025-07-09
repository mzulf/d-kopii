
const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Coffee Enthusiast",
    content: "D'Kopi offers the most authentic and rich coffee powder I've ever tasted. Their Sumatra blend has become my morning ritual.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Café Owner",
    content: "As a café owner, I've tried countless coffee brands. D'Kopi stands out for its consistency and exceptional quality. My customers can taste the difference.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Dimas Prayoga",
    role: "Barista",
    content: "The complexity of flavors in D'Kopi's beans makes them a joy to work with. Their highland Java blend creates a perfect crema every time.",
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-coffee-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't take our word for it — see what coffee lovers across Indonesia are saying about D'Kopi's premium products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg p-6 shadow-md card-shadow flex flex-col"
            >
              <div className="flex-grow">
                <p className="italic text-gray-600 mb-4">"{testimonial.content}"</p>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
