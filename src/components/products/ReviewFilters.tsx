import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";

interface ReviewFiltersProps {
  activeRatingFilter: number | null;
  setActiveRatingFilter: (rating: number | null) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  totalReviews: number;
  ratingCounts: Record<number, number>;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  activeRatingFilter,
  setActiveRatingFilter,
  sortOption,
  setSortOption,
  totalReviews,
  ratingCounts,
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Filter by Rating
          </h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeRatingFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRatingFilter(null)}
              className={
                activeRatingFilter === null
                  ? "bg-boutique-600 hover:bg-boutique-700"
                  : ""
              }
            >
              All ({totalReviews})
            </Button>

            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={activeRatingFilter === rating ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveRatingFilter(rating)}
                className={`${
                  activeRatingFilter === rating
                    ? "bg-boutique-600 hover:bg-boutique-700"
                    : ""
                }`}
                disabled={!ratingCounts[rating]}
              >
                <div className="flex items-center">
                  <span className="mr-1">{rating}</span>
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  <span className="ml-1">({ratingCounts[rating] || 0})</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full sm:w-48">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sort by</h4>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeRatingFilter !== null && (
        <div className="flex items-center">
          <p className="text-sm text-gray-600">
            Showing {ratingCounts[activeRatingFilter] || 0} reviews with{" "}
            {activeRatingFilter} star rating
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={() => setActiveRatingFilter(null)}
            className="text-boutique-600 p-1"
          >
            Clear filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewFilters;
