import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Upload, Clock, Tag, Info } from "lucide-react";
import { categoryData } from "@/components/categories/CategoryPage";

interface CreateListingFormProps {
  initialCategory?: string;
  initialSubcategory?: string;
  onSuccess?: () => void;
}

const CreateListingForm = ({
  initialCategory = "",
  initialSubcategory = "",
  onSuccess,
}: CreateListingFormProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState(initialSubcategory);
  const [images, setImages] = useState<File[]>([]);
  const [duration, setDuration] = useState("one-time");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Get subcategories based on selected category
  const subcategories = category
    ? categoryData[category]?.subcategories || []
    : [];

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages([...images, ...fileArray]);

      // Create preview URLs
      const newPreviewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]); // Clean up URL object
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!title || !description || !price || !category || !subcategory) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one image");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success handling
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate to the listing page or dashboard
        navigate(`/categories/${category}`);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get category-specific fields
  const renderCategorySpecificFields = () => {
    switch (category) {
      case "side-hustles":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time service</SelectItem>
                  <SelectItem value="recurring">Recurring service</SelectItem>
                  <SelectItem value="flexible">Flexible schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Service Location</Label>
              <Input
                id="location"
                placeholder="e.g., On campus, Remote, etc."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </>
        );
      case "experiences":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="duration">Experience Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-hour">
                    Less than 1 hour
                  </SelectItem>
                  <SelectItem value="1-3-hours">1-3 hours</SelectItem>
                  <SelectItem value="half-day">Half day</SelectItem>
                  <SelectItem value="full-day">Full day</SelectItem>
                  <SelectItem value="multi-day">Multiple days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Meeting Point</Label>
              <Input
                id="location"
                placeholder="e.g., Student Center, Library, etc."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groupSize">Maximum Group Size</Label>
              <Input
                id="groupSize"
                type="number"
                placeholder="e.g., 5"
                min="1"
              />
            </div>
          </>
        );
      case "rentals":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="duration">Rental Period</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rental period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="semester">Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Item Condition</Label>
              <Select defaultValue="good">
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New/Like New</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="worn">Worn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Security Deposit (if any)</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs text-gray-400">
                  Rs.
                </span>
                <Input
                  id="deposit"
                  type="number"
                  className="pl-10"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </>
        );
      case "digital-services":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-day">1 day</SelectItem>
                  <SelectItem value="3-days">3 days</SelectItem>
                  <SelectItem value="1-week">1 week</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="revisions">Number of Revisions</Label>
              <Input
                id="revisions"
                type="number"
                placeholder="e.g., 2"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Link (optional)</Label>
              <Input id="portfolio" placeholder="https://your-portfolio.com" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Create a New Listing
        </h1>
        <p className="mt-2 text-gray-600">
          Fill out the form below to list your service, experience, rental, or
          digital service on Trade Hive.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listing Details</CardTitle>
          <CardDescription>
            Provide detailed information about what you're offering
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Listing Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Math Tutoring, Campus Tour, Camera Rental"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're offering in detail..."
                  className="min-h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categoryData).map((key) => (
                        <SelectItem key={key} value={key}>
                          {categoryData[key].title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">
                    Subcategory <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={subcategory}
                    onValueChange={setSubcategory}
                    disabled={!category}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          category
                            ? "Select subcategory"
                            : "Select a category first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs text-gray-400">
                    Rs.
                  </span>
                  <Input
                    id="price"
                    type="number"
                    className="pl-10"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Category-specific fields */}
            {category && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {categoryData[category]?.title} Details
                </h3>
                {renderCategorySpecificFields()}
              </div>
            )}

            <Separator />

            {/* Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Images <span className="text-destructive">*</span>
                </h3>
                <p className="text-xs text-gray-500">Upload up to 5 images</p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {/* Image previews */}
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-md border bg-gray-50"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1 rounded-full bg-gray-900/50 p-1 text-white hover:bg-gray-900/70"
                      onClick={() => removeImage(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Upload button */}
                {previewUrls.length < 5 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-gray-50 hover:bg-gray-100">
                    <Upload className="mb-2 h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      multiple={previewUrls.length === 0}
                    />
                  </label>
                )}
              </div>
            </div>

            <Separator />

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="tags"
                    placeholder="e.g., math, tutoring, calculus"
                    className="pl-10"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={isAvailable}
                  onCheckedChange={(checked) =>
                    setIsAvailable(checked as boolean)
                  }
                />
                <label
                  htmlFor="available"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  This listing is currently available
                </label>
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Before you submit
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      By submitting this listing, you agree to Trade Hive's
                      terms of service and community guidelines. Your listing
                      will be reviewed before being published.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating listing..." : "Create Listing"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateListingForm;
