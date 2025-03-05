import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import { cn } from "@/lib/utils";

// Import the category data from the CategoryPage
import { categoryData } from "./CategoryPage";

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams<{
    categoryId: string;
    subcategoryId: string;
  }>();
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 150,
  ]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Default to side-hustles if no valid category is provided
  const category =
    categoryId && categoryData[categoryId]
      ? categoryData[categoryId]
      : categoryData["side-hustles"];

  // Find the subcategory
  const subcategory = category.subcategories.find(
    (sub) => sub.id === subcategoryId,
  );

  // Filter listings based on subcategory, price range, and search query
  const filteredListings = category.listings.filter((listing) => {
    const matchesSubcategory = listing.subcategory === subcategoryId;
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
        {/* Subcategory Header */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link
                  to={`/categories/${category.id}`}
                  className="hover:text-primary"
                >
                  {category.title}
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-gray-700">
                  {subcategory?.name}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {subcategory?.name}
                  </h1>
                  <p className="text-gray-600 mt-1 max-w-2xl">
                    Browse all {subcategory?.name.toLowerCase()} services
                    offered by students
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button className="gap-2">List in {subcategory?.name}</Button>
                </div>
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
                  placeholder={`Search in ${subcategory?.name}...`}
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

        {/* Listings */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {subcategory?.name} Listings
              <span className="ml-2 text-sm font-normal text-gray-500">
                {filteredListings.length} listings
              </span>
            </h2>

            <div>
              <select
                className="border rounded-md px-3 py-1.5 text-sm bg-white"
                defaultValue="newest"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  setPriceRange([0, 150]);
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubcategoryPage;
