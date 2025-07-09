
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-coffee-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with any questions or feedback!
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-coffee-accent w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      Jl. Kopi No. 123<br />
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="text-coffee-accent w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      info@dkopi.com<br />
                      support@dkopi.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="text-coffee-accent w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      +62 (021) 123-4567<br />
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="text-coffee-accent w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">Opening Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Coming Soon</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Type your message here..."
                    className="min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-coffee-dark hover:bg-coffee-accent"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-coffee-dark">Do you ship internationally?</h3>
              <p className="text-gray-600">
                Yes, we ship to select countries in Southeast Asia, Australia, and the United States.
                International shipping typically takes 7-14 business days.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-coffee-dark">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept credit cards (Visa, Mastercard), PayPal, bank transfers, and various 
                local payment options like GoPay and OVO for Indonesian customers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-coffee-dark">How should I store my coffee?</h3>
              <p className="text-gray-600">
                Store your coffee in an airtight container in a cool, dark place. Avoid refrigerating 
                as coffee can absorb other odors and moisture.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-coffee-dark">Do you offer wholesale options?</h3>
              <p className="text-gray-600">
                Yes, we offer wholesale pricing for cafes, restaurants, and retailers. 
                Please contact our sales team at wholesale@dkopi.com for more information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
