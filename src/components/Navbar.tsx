
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  LogIn,
  UserPlus
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/CartContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import products from "@/data/products";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  useEffect(() => {
    // Handle clicks outside of search popover to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.length >= 2) {
      const filteredResults = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      
      setSearchResults(filteredResults);
      setIsPopoverOpen(true);
    } else {
      setSearchResults([]);
      setIsPopoverOpen(term.length > 0);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setIsPopoverOpen(false);
      setIsSearchOpen(false);
    }
  };

  const handleItemSelect = (productId: number) => {
    navigate(`/product/${productId}`);
    setSearchTerm("");
    setIsPopoverOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-serif font-bold text-coffee-dark">
              D'<span className="text-coffee-accent">Kopi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-6 font-medium">
              <Link to="/" className="hover:text-coffee-accent transition-colors">
                Home
              </Link>
              <Link to="/shop" className="hover:text-coffee-accent transition-colors">
                Shop
              </Link>
              <Link to="/about" className="hover:text-coffee-accent transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-coffee-accent transition-colors">
                Contact
              </Link>
            </nav>
          )}

          {/* Search bar (desktop) */}
          {!isMobile && (
            <div className="hidden md:flex items-center relative flex-1 max-w-xs mx-4" ref={searchRef}>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search coffee..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </form>
                </PopoverTrigger>
                <PopoverContent 
                  className="p-0 w-[300px]" 
                  align="start"
                  side="bottom"
                >
                  <Command>
                    <CommandList>
                      <CommandEmpty>No results found</CommandEmpty>
                      <CommandGroup heading="Products">
                        {searchResults.map((product) => (
                          <CommandItem
                            key={product.id}
                            onSelect={() => handleItemSelect(product.id)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-8 w-8 object-cover rounded"
                            />
                            <div className="flex flex-col">
                              <span>{product.name}</span>
                              <span className="text-xs text-muted-foreground">
                                Rp {product.price.toLocaleString()}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-foreground">
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-foreground">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coffee-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            {!isMobile ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="flex items-center gap-2 bg-coffee-dark hover:bg-coffee-accent">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden text-foreground">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobile && isSearchOpen && (
          <div className="pt-4 pb-2 animate-fade-in" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search coffee..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </form>
            
            {isPopoverOpen && searchResults.length > 0 && (
              <div className="mt-2 bg-background border rounded-md shadow-md">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Products</div>
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                      onClick={() => handleItemSelect(product.id)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-8 w-8 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span>{product.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Rp {product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <nav className="mt-4 pb-4 space-y-3 animate-fade-in">
            <Link to="/" className="block py-2 hover:text-coffee-accent transition-colors">
              Home
            </Link>
            <Link to="/shop" className="block py-2 hover:text-coffee-accent transition-colors">
              Shop
            </Link>
            <Link to="/about" className="block py-2 hover:text-coffee-accent transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="block py-2 hover:text-coffee-accent transition-colors">
              Contact
            </Link>
            <Link to="/register" className="block py-2 hover:text-coffee-accent transition-colors">
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
