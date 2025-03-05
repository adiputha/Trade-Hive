import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListingCard from "./ListingCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeaturedListingsProps {
  title?: string;
  subtitle?: string;
  listings?: Array<{
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    sellerName: string;
    sellerAvatar: string;
    isFeatured: boolean;
  }>;
}

const FeaturedListings = ({
  title = "Featured Listings",
  subtitle = "Discover top-rated services from fellow students",
  listings = [
    {
      id: "1",
      title: "Professional Logo Design",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
      category: "Digital Services",
      rating: 4.8,
      sellerName: "Alex Johnson",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      isFeatured: true,
    },
    {
      id: "2",
      title: "Math Tutoring - Calculus & Statistics",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
      category: "Side Hustles",
      rating: 4.9,
      sellerName: "Maya Patel",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      isFeatured: true,
    },
    {
      id: "3",
      title: "Campus Tour Guide Experience",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
      category: "Experiences",
      rating: 4.7,
      sellerName: "Carlos Rodriguez",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      isFeatured: false,
    },
    {
      id: "4",
      title: "DSLR Camera Rental - Weekend",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      category: "Rentals",
      rating: 4.6,
      sellerName: "Jordan Lee",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      isFeatured: false,
    },
    {
      id: "5",
      title: "Website Development - Portfolio Sites",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80",
      category: "Digital Services",
      rating: 5.0,
      sellerName: "Taylor Smith",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      isFeatured: true,
    },
    {
      id: "6",
      title: "Dorm Room Cleaning Service",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
      category: "Side Hustles",
      rating: 4.5,
      sellerName: "Sam Wilson",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      isFeatured: false,
    },
    {
      id: "7",
      title: "Bike Rental - Monthly",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
      category: "Rentals",
      rating: 4.7,
      sellerName: "Jamie Chen",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      isFeatured: false,
    },
    {
      id: "8",
      title: "Campus Food Tour Experience",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      category: "Experiences",
      rating: 4.9,
      sellerName: "Riley Johnson",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
      isFeatured: true,
    },
  ],
}: FeaturedListingsProps) => {
  // Categories derived from the listings
  const categories = ["All", ...new Set(listings.map((item) => item.category))];

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white border">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>

          {/* All listings tab */}
          <TabsContent value="All" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  image={listing.image}
                  category={listing.category}
                  rating={listing.rating}
                  sellerName={listing.sellerName}
                  sellerAvatar={listing.sellerAvatar}
                  isFeatured={listing.isFeatured}
                  onClick={() =>
                    console.log(`Clicked on listing ${listing.id}`)
                  }
                />
              ))}
            </div>
          </TabsContent>

          {/* Category-specific tabs */}
          {categories
            .filter((cat) => cat !== "All")
            .map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {listings
                    .filter((listing) => listing.category === category)
                    .map((listing) => (
                      <ListingCard
                        key={listing.id}
                        id={listing.id}
                        title={listing.title}
                        price={listing.price}
                        image={listing.image}
                        category={listing.category}
                        rating={listing.rating}
                        sellerName={listing.sellerName}
                        sellerAvatar={listing.sellerAvatar}
                        isFeatured={listing.isFeatured}
                        onClick={() =>
                          console.log(`Clicked on listing ${listing.id}`)
                        }
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
        </Tabs>

        <div className="mt-10 text-center">
          <Button className="px-6">View All Listings</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
