import { Product } from "@/components/ProductCard";

// Import semua gambar secara langsung
import acehGayo from "@/components/assets/products/aceh-gayo.jpg";
import baliKintamani from "@/components/assets/products/Bali-Kintamani.jpg";
import javaRobusta from "@/components/assets/products/java-robusta.jpg";
import sumatraMandheling from "@/components/assets/products/sumatramandheling.webp";
import torajaSapan from "@/components/assets/products/toraja-sapan.jpg";
import floresBajawa from "@/components/assets/products/kopi-flores-bajawa.jpeg";
import papuaWamena from "@/components/assets/products/papua-wamena.jpg";
import lampungRobusta from "@/components/assets/products/lampung-robusta.jpeg";
import luwakPremium from "@/components/assets/products/Luwak.jpg";
import javaPreanger from "@/components/assets/products/java-preanger.jpg";
import acehUleeKareng from "@/components/assets/products/aceh-ulee-kareng.jpg";
import baliOrganic from "@/components/assets/products/bali-organic.jpeg";

const products: Product[] = [
  {
    id: 1,
    name: "Aceh Gayo Premium Coffee",
    price: 85000,
    image: acehGayo,
    category: "arabica",
    rating: 4.8
  },
  {
    id: 2,
    name: "Bali Kintamani Coffee",
    price: 75000,
    image: baliKintamani,
    category: "arabica",
    rating: 4.6
  },
  {
    id: 3,
    name: "Java Robusta Dark Roast",
    price: 65000,
    image: javaRobusta,
    category: "robusta",
    rating: 4.3
  },
  {
    id: 4,
    name: "Sumatra Mandheling Coffee",
    price: 90000,
    image: sumatraMandheling,
    category: "arabica",
    rating: 4.9
  },
  {
    id: 5,
    name: "Toraja Sapan Coffee",
    price: 95000,
    image: torajaSapan,
    category: "premium",
    rating: 4.7
  },
  {
    id: 6,
    name: "Flores Bajawa Coffee",
    price: 80000,
    image: floresBajawa,
    category: "arabica",
    rating: 4.5
  },
  {
    id: 7,
    name: "Papua Wamena Coffee",
    price: 110000,
    image: papuaWamena,
    category: "premium",
    rating: 4.9
  },
  {
    id: 8,
    name: "Lampung Robusta Coffee",
    price: 60000,
    image: lampungRobusta,
    category: "robusta",
    rating: 4.2
  },
  {
    id: 9,
    name: "Luwak Premium Coffee",
    price: 250000,
    image: luwakPremium,
    category: "specialty",
    rating: 4.9
  },
  {
    id: 10,
    name: "Java Preanger Coffee",
    price: 85000,
    image: javaPreanger,
    category: "arabica",
    rating: 4.6
  },
  {
    id: 11,
    name: "Aceh Ulee Kareng Coffee",
    price: 80000,
    image: acehUleeKareng,
    category: "arabica",
    rating: 4.5
  },
  {
    id: 12,
    name: "Bali Organic Coffee",
    price: 95000,
    image: baliOrganic,
    category: "organic",
    rating: 4.7
  }
];

export default products;