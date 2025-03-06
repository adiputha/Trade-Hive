import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, Home, Laptop } from "lucide-react";

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

interface CategoryGridProps {
  categories?: CategoryItem[];
  className?: string;
}

const CategoryGrid = ({
  categories = [
    {
      id: "side-hustles",
      title: "Side Hustles",
      description: "Discover student-run businesses and services",
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-700",
      href: "/categories/side-hustles",
    },
    {
      id: "experiences",
      title: "Experiences",
      description: "Join unique events and activities hosted by students",
      icon: <Calendar className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-700",
      href: "/categories/experiences",
    },
    {
      id: "rentals",
      title: "Rentals",
      description: "Rent items, spaces, and equipment from fellow students",
      icon: <Home className="h-8 w-8" />,
      color: "bg-amber-100 text-amber-700",
      href: "/categories/rentals",
    },
    {
      id: "digital-services",
      title: "Digital Services",
      description: "Find freelance digital services for your projects",
      icon: <Laptop className="h-8 w-8" />,
      color: "bg-emerald-100 text-emerald-700",
      href: "/categories/digital-services",
    },
  ],
  className,
}: CategoryGridProps) => {
  return (
    <div
      className={cn("w-full max-w-7xl mx-auto px-4 py-12 bg-white", className)}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Explore Categories
        </h2>
    
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer h-full"
            onClick={() => (window.location.href = category.href)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div
                className={cn("p-3 rounded-full w-fit mb-4", category.color)}
              >
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm flex-grow">
                {category.description}
              </p>

              <div className="mt-4 text-sm font-medium text-primary flex items-center">
                Explore {category.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
