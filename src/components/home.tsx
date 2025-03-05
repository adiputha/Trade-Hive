import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./layout/Navbar";
import HeroBanner from "./home/HeroBanner";
import CategoryGrid from "./home/CategoryGrid";
import FeaturedListings from "./listings/FeaturedListings";
import Footer from "./layout/Footer";

interface HomePageProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
}

const HomePage = ({
  isLoggedIn = false,
  username = "Guest",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  notificationCount = 0,
}: HomePageProps) => {
  // Hero banner CTAs
  const handleExploreClick = () => {
    console.log("Explore marketplace clicked");
    // Navigation logic would go here
  };

  const handleListServiceClick = () => {
    console.log("List service clicked");
    // Navigation or modal open logic would go here
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        avatarUrl={avatarUrl}
        notificationCount={notificationCount}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          title="Trade Hive: Student Marketplace"
          subtitle="Discover, buy, and sell student services, products, and experiences all in one place."
          primaryCta={{
            text: "Explore Marketplace",
            onClick: handleExploreClick,
          }}
          secondaryCta={{
            text: "List Your Service",
            onClick: handleListServiceClick,
          }}
        />

        {/* Categories Section */}
        <CategoryGrid />

        {/* Featured Listings Section */}
        <FeaturedListings />

        {/* Additional Sections could be added here */}
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Join Our Student Marketplace
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              Whether you're looking to earn extra income, share your skills, or
              find affordable services, Trade Hive connects you with fellow
              students across campus.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up Now
              </Link>
              <Link
                to="/about"
                className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="mt-2 text-gray-600">Active Student Sellers</p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <p className="text-4xl font-bold text-primary">1,200+</p>
                <p className="mt-2 text-gray-600">Services & Products</p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <p className="text-4xl font-bold text-primary">15+</p>
                <p className="mt-2 text-gray-600">Campus Communities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
              What Students Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                    alt="Emma"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Emma L.</h4>
                    <p className="text-sm text-gray-500">Computer Science</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I've been able to fund my semester abroad by offering logo
                  design services on Trade Hive. The platform made it easy to
                  connect with students who needed design work!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
                    alt="Marcus"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Marcus T.</h4>
                    <p className="text-sm text-gray-500">
                      Business Administration
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Renting camera equipment through Trade Hive saved me hundreds
                  of dollars for my film project. The rental process was smooth
                  and the equipment was in great condition."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia"
                    alt="Sophia"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Sophia K.</h4>
                    <p className="text-sm text-gray-500">
                      Environmental Science
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I booked a campus tour experience through Trade Hive when my
                  family visited. Our guide was knowledgeable and showed us
                  hidden spots we would have never found on our own!"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
