import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Briefcase,
  Calendar,
  Home,
  Laptop,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import { cn } from "@/lib/utils";

interface SubcategoryItem {
  id: string;
  name: string;
  count: number;
  description?: string;
}

interface CategoryData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  subcategories: SubcategoryItem[];
  listings: Array<{
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    subcategory: string;
    rating: number;
    sellerName: string;
    sellerAvatar: string;
    isFeatured: boolean;
  }>;
}

export const categoryData: Record<string, CategoryData> = {
  "side-hustles": {
    id: "side-hustles",
    title: "Side Hustles",
    description:
      "Support student entrepreneurs and discover unique services just for you!",
    icon: <Briefcase className="h-10 w-10" />,
    color: "bg-blue-100 text-blue-700",
    subcategories: [
      {
        id: "tutoring",
        name: "Tutoring",
        count: 24,
        description:
          "Academic tutoring, music coaching, and skill-based mentoring.",
      },
      {
        id: "language-communication",
        name: "Language & Communication",
        count: 18,
        description:
          "Language tutoring, public speaking coaching, debate training, and accent improvement.",
      },
      {
        id: "photography-videography",
        name: "Photography & Videography",
        count: 15,
        description:
          "Event photography, portrait shoots, and creative videography.",
      },
      {
        id: "crafts-accessories",
        name: "Crafts & Accessories",
        count: 22,
        description:
          "Handmade jewelry, custom keychains, knitted goods, and DIY crafts and many more.",
      },
      {
        id: "homemade-eats",
        name: "Homemade Eats & Treats",
        count: 19,
        description:
          "Freshly baked goods, home-cooked meals, and unique snacks made by students.",
      },
      {
        id: "fitness-coaching",
        name: "Fitness Coaching",
        count: 15,
        description:
          "Personalized workout plans, yoga sessions, sports training, and wellness coaching.",
      },
      {
        id: "event-planning",
        name: "Event Planning",
        count: 9,
        description:
          "Help with organizing campus events, parties, and gatherings.",
      },
    ],
    listings: [
      {
        id: "sh1",
        title: "Math & Statistics Tutoring",
        price: 25,
        image:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
        category: "Side Hustles",
        subcategory: "Tutoring",
        rating: 4.9,
        sellerName: "Maya Patel",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        isFeatured: true,
      },
      {
        id: "sh2",
        title: "Campus Food Delivery",
        price: 5,
        image:
          "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&q=80",
        category: "Side Hustles",
        subcategory: "Delivery Services",
        rating: 4.7,
        sellerName: "Tyler Johnson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tyler",
        isFeatured: false,
      },
      {
        id: "sh3",
        title: "Personal Shopping Assistant",
        price: 15,
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
        category: "Side Hustles",
        subcategory: "Personal Assistant",
        rating: 4.6,
        sellerName: "Emma Wilson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        isFeatured: false,
      },
      {
        id: "sh4",
        title: "Dorm Room Cleaning Service",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
        category: "Side Hustles",
        subcategory: "Personal Assistant",
        rating: 4.5,
        sellerName: "Sam Wilson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
        isFeatured: false,
      },
      {
        id: "sh5",
        title: "Fraternity/Sorority Event Planning",
        price: 50,
        image:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80",
        category: "Side Hustles",
        subcategory: "Event Planning",
        rating: 4.8,
        sellerName: "Jessica Chen",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
        isFeatured: true,
      },
      {
        id: "sh6",
        title: "Personal Fitness Training",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
        category: "Side Hustles",
        subcategory: "Fitness Coaching",
        rating: 4.9,
        sellerName: "Marcus Johnson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        isFeatured: false,
      },
    ],
  },
  experiences: {
    id: "experiences",
    title: "Experiences",
    description:
      "Bringing Students Together Through Events! Join to participate and discover exciting campus events.",
    icon: <Calendar className="h-10 w-10" />,
    color: "bg-purple-100 text-purple-700",
    subcategories: [
      {
        id: "csr-projects",
        name: "CSR Projects",
        count: 10,
        description:
          "Volunteer drives, community service, environmental initiatives, and student-led social impact projects.",
      },
      {
        id: "entertainment",
        name: "Entertainment",
        count: 18,
        description:
          "Campus concerts, open mic nights, comedy shows, cultural fests, and gaming tournaments.",
      },
      {
        id: "seminars-workshops",
        name: "Seminars & Workshops",
        count: 14,
        description:
          "Skill-building sessions, industry talks, startup showcases, and personal development workshops.",
      },
      {
        id: "campus-challenges",
        name: "Campus Challenges",
        count: 12,
        description:
          "Hackathons, business pitch competitions, sports tournaments, and quiz battles.",
      },
      {
        id: "outdoor-adventures",
        name: "Outdoor Adventures",
        count: 15,
        description:
          "Embark on unforgettable student-led adventures! Join thrilling trips and hikes with your friends—click to explore upcoming adventures!",
      },
    ],
    listings: [
      {
        id: "ex1",
        title: "Hidden Campus Spots Tour",
        price: 15,
        image:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
        category: "Experiences",
        subcategory: "Campus Tours",
        rating: 4.7,
        sellerName: "Carlos Rodriguez",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        isFeatured: false,
      },
      {
        id: "ex2",
        title: "Campus Food Tour Experience",
        price: 25,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
        category: "Experiences",
        subcategory: "Food Experiences",
        rating: 4.9,
        sellerName: "Riley Johnson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
        isFeatured: true,
      },
      {
        id: "ex3",
        title: "Weekend Hiking Adventure",
        price: 20,
        image:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
        category: "Experiences",
        subcategory: "Outdoor Adventures",
        rating: 4.8,
        sellerName: "Alex Thompson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        isFeatured: false,
      },
      {
        id: "ex4",
        title: "International Food Festival",
        price: 15,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
        category: "Experiences",
        subcategory: "Cultural Events",
        rating: 4.6,
        sellerName: "Sophia Kim",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
        isFeatured: true,
      },
      {
        id: "ex5",
        title: "Photography Workshop",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80",
        category: "Experiences",
        subcategory: "Workshops",
        rating: 4.7,
        sellerName: "Jordan Lee",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        isFeatured: false,
      },
      {
        id: "ex6",
        title: "Sunset Kayaking Trip",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1603715379703-6de6b4c2a3b5?w=400&q=80",
        category: "Experiences",
        subcategory: "Outdoor Adventures",
        rating: 4.9,
        sellerName: "Jamie Chen",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        isFeatured: false,
      },
    ],
  },
  rentals: {
    id: "rentals",
    title: "Rentals",
    description:
      "Rent items, spaces, and equipment from fellow students at affordable prices.",
    icon: <Home className="h-10 w-10" />,
    color: "bg-amber-100 text-amber-700",
    subcategories: [
      {
        id: "room-rentals",
        name: "Room Rentals & Accommodations",
        count: 18,
        description:
          "Short-term and long-term room rentals, hostel swaps, and shared living spaces.",
      },
      {
        id: "bike-rentals",
        name: "Bike Rentals",
        count: 22,
        description:
          "Bicycles, scooters, skateboards, and e-bikes for easy campus commuting.",
      },
      {
        id: "music-instrument-rentals",
        name: "Music Instrument Rentals",
        count: 15,
        description:
          "Guitars, keyboards, drums, violins, and DJ equipment for musicians and performers.",
      },
      {
        id: "gadget-rentals",
        name: "Gadget Rentals",
        count: 25,
        description:
          "Laptops, tablets, projectors, cameras, gaming consoles, and smart devices for short-term use.",
      },
      {
        id: "stationery-academic",
        name: "Stationery & Academic Supplies",
        count: 30,
        description:
          "Calculators, drawing tablets, lab equipment, whiteboards, and textbooks on rent.",
      },
    ],
    listings: [
      {
        id: "r1",
        title: "DSLR Camera Rental - Weekend",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
        category: "Rentals",
        subcategory: "Electronics",
        rating: 4.6,
        sellerName: "Jordan Lee",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        isFeatured: false,
      },
      {
        id: "r2",
        title: "Calculus Textbook - Semester",
        price: 25,
        image:
          "https://images.unsplash.com/photo-1588580000645-f39a59f07b81?w=400&q=80",
        category: "Rentals",
        subcategory: "Textbooks",
        rating: 4.5,
        sellerName: "Taylor Smith",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        isFeatured: false,
      },
      {
        id: "r3",
        title: "Study Room Rental - Hourly",
        price: 10,
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80",
        category: "Rentals",
        subcategory: "Spaces",
        rating: 4.7,
        sellerName: "Alex Johnson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        isFeatured: true,
      },
      {
        id: "r4",
        title: "Bike Rental - Monthly",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
        category: "Rentals",
        subcategory: "Vehicles",
        rating: 4.7,
        sellerName: "Jamie Chen",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        isFeatured: false,
      },
      {
        id: "r5",
        title: "Projector Rental - Daily",
        price: 20,
        image:
          "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80",
        category: "Rentals",
        subcategory: "Equipment",
        rating: 4.8,
        sellerName: "Morgan Taylor",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
        isFeatured: true,
      },
      {
        id: "r6",
        title: "Gaming Console - Weekend",
        price: 30,
        image:
          "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&q=80",
        category: "Rentals",
        subcategory: "Electronics",
        rating: 4.9,
        sellerName: "Sam Wilson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
        isFeatured: false,
      },
    ],
  },
  "digital-services": {
    id: "digital-services",
    title: "Digital Services",
    description:
      "Unlock student talent! Get top-notch freelance work for your projects.",
    icon: <Laptop className="h-10 w-10" />,
    color: "bg-emerald-100 text-emerald-700",
    subcategories: [
      {
        id: "pixel-perfect",
        name: "Pixel Perfect",
        count: 28,
        description: "Graphic design, logo creation, and branding.",
      },
      {
        id: "career-boost",
        name: "Career Boost",
        count: 22,
        description: "Resume writing, CV building, and LinkedIn optimization.",
      },
      {
        id: "code-create",
        name: "Code & Create",
        count: 20,
        description: "Coding, app development, and website design.",
      },
      {
        id: "write-right",
        name: "Write Right",
        count: 18,
        description: "Content writing, blog posts, and copywriting.",
      },
      {
        id: "trendsetters",
        name: "Trendsetters",
        count: 15,
        description: "Social media management & digital marketing.",
      },
    ],
    listings: [
      {
        id: "ds1",
        title: "Professional Logo Design",
        price: 25,
        image:
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
        category: "Digital Services",
        subcategory: "Graphic Design",
        rating: 4.8,
        sellerName: "Alex Johnson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        isFeatured: true,
      },
      {
        id: "ds2",
        title: "Website Development - Portfolio Sites",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80",
        category: "Digital Services",
        subcategory: "Web Development",
        rating: 5.0,
        sellerName: "Taylor Smith",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        isFeatured: true,
      },
      {
        id: "ds3",
        title: "Academic Essay Writing",
        price: 40,
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
        category: "Digital Services",
        subcategory: "Content Writing",
        rating: 4.7,
        sellerName: "Emma Wilson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        isFeatured: false,
      },
      {
        id: "ds4",
        title: "YouTube Video Editing",
        price: 50,
        image:
          "https://images.unsplash.com/photo-1574717024453-354056adc482?w=400&q=80",
        category: "Digital Services",
        subcategory: "Video Editing",
        rating: 4.9,
        sellerName: "Jordan Lee",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        isFeatured: false,
      },
      {
        id: "ds5",
        title: "Instagram Growth Strategy",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
        category: "Digital Services",
        subcategory: "Social Media Management",
        rating: 4.6,
        sellerName: "Riley Johnson",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
        isFeatured: false,
      },
      {
        id: "ds6",
        title: "Mobile App UI Design",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80",
        category: "Digital Services",
        subcategory: "Graphic Design",
        rating: 4.8,
        sellerName: "Jamie Chen",
        sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        isFeatured: true,
      },
    ],
  },
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [activeSubcategory, setActiveSubcategory] =
    React.useState<string>("all");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 150,
  ]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Default to side-hustles if no valid category is provided
  const category =
    categoryId && categoryData[categoryId]
      ? categoryData[categoryId]
      : categoryData["side-hustles"];

  // Filter listings based on active subcategory, price range, and search query
  const filteredListings = category.listings.filter((listing) => {
    const matchesSubcategory =
      activeSubcategory === "all" || listing.subcategory === activeSubcategory;
    const matchesPriceRange =
      listing.price >= priceRange[0] && listing.price <= priceRange[1];
    const matchesSearch =
      searchQuery === "" ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.sellerName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubcategory && matchesPriceRange && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Category Header */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn("p-4 rounded-full", category.color)}>
                  {category.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {category.title}
                  </h1>
                  <p className="text-gray-600 mt-1 max-w-2xl">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  className="gap-2"
                  onClick={() =>
                    navigate(`/create-listing?category=${category.id}`)
                  }
                >
                  List in {category.title}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="border-b py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <form
                className="relative w-full max-w-md"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="search"
                  placeholder={`Search in ${category.title}...`}
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </span>
                <div className="w-48">
                  <Slider
                    defaultValue={[0, 150]}
                    max={150}
                    step={5}
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories and Listings */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Subcategories Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border p-4 sticky top-24">
                <h3 className="font-semibold mb-3">Subcategories</h3>
                <div className="space-y-1">
                  <button
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                      activeSubcategory === "all"
                        ? `${category.color} font-medium`
                        : "hover:bg-gray-100",
                    )}
                    onClick={() => setActiveSubcategory("all")}
                  >
                    All {category.title}
                    <span className="ml-1 text-xs text-gray-500">
                      ({category.listings.length})
                    </span>
                  </button>

                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        activeSubcategory === subcategory.id
                          ? `${category.color} font-medium`
                          : "hover:bg-gray-100",
                      )}
                      onClick={() => setActiveSubcategory(subcategory.id)}
                    >
                      {subcategory.name}
                      <span className="ml-1 text-xs text-gray-500">
                        ({subcategory.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {activeSubcategory === "all"
                      ? `All ${category.title}`
                      : category.subcategories.find(
                          (s) => s.id === activeSubcategory,
                        )?.name}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {filteredListings.length} listings
                    </span>
                  </h2>
                  {activeSubcategory !== "all" && (
                    <p className="text-sm text-gray-600 mt-1">
                      {
                        category.subcategories.find(
                          (s) => s.id === activeSubcategory,
                        )?.description
                      }
                    </p>
                  )}
                </div>

                <div>
                  <Tabs defaultValue="grid">
                    <TabsList className="bg-white border">
                      <TabsTrigger value="grid">Grid</TabsTrigger>
                      <TabsTrigger value="list">List</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
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
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border">
                  <p className="text-gray-500">
                    No listings found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setActiveSubcategory("all");
                      setPriceRange([0, 150]);
                      setSearchQuery("");
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
