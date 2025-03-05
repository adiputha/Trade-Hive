import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ShoppingCart, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
}

const Navbar = ({
  isLoggedIn = false,
  username = "Guest",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  notificationCount = 0,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    console.log("Searching for:", searchQuery);
  };

  const categories = [
    { name: "Side Hustles", path: "/categories/side-hustles" },
    { name: "Experiences", path: "/categories/experiences" },
    { name: "Rentals", path: "/categories/rentals" },
    { name: "Digital Services", path: "/categories/digital-services" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Trade Hive Logo" className="h-14 w-14" />
          <span className="hidden text-xl font-bold md:block">TRADE HIVE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:gap-x-6">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative flex w-full max-w-md flex-1"
          >
            <Input
              type="search"
              placeholder="Search for services..."
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

          {/* Category Links */}
          <div className="hidden space-x-4 lg:flex">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {notificationCount}
                    </span>
                  )}
                </Button>

                {/* Cart */}
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 rounded-full"
                    >
                      <img
                        src={avatarUrl}
                        alt={username}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="hidden text-sm font-medium lg:block">
                        {username}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/listings">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/logout">Logout</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {isLoggedIn && (
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "absolute left-0 right-0 top-20 z-50 bg-white p-4 shadow-md md:hidden",
            isMenuOpen ? "block" : "hidden",
          )}
        >
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for services..."
                className="w-full pr-10"
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
            </div>
          </form>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Categories</p>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block py-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t pt-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={avatarUrl}
                    alt={username}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{username}</span>
                </div>
                <Link
                  to="/profile"
                  className="block py-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                  onClick={toggleMenu}
                >
                  My Profile
                </Link>
                <Link
                  to="/listings"
                  className="block py-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                  onClick={toggleMenu}
                >
                  My Listings
                </Link>
                <Link
                  to="/orders"
                  className="block py-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                  onClick={toggleMenu}
                >
                  Orders
                </Link>
                <Link
                  to="/settings"
                  className="block py-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                  onClick={toggleMenu}
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block py-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                  onClick={toggleMenu}
                >
                  Logout
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={toggleMenu}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register" onClick={toggleMenu}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
