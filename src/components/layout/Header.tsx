import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Heart,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import GlobalSearch from "../search/GlobalSearch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Header: React.FC = () => {
  const { cartItems, getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [appointmentType, setAppointmentType] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = getCartCount();

  // Available time slots
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // Appointment types
  const appointmentTypes = [
    "Style Consultation",
    "Custom Fitting",
    "Personal Shopping",
    "Bridal Consultation",
    "Accessory Styling",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleBookAppointment = async () => {
    if (!date || !timeSlot || !appointmentType) {
      toast({
        title: "Incomplete Information",
        description: "Please select a date, time, and appointment type.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Appointment Requested",
        description: `Your ${appointmentType} appointment for ${format(
          date,
          "PPP"
        )} at ${timeSlot} has been requested. We'll confirm shortly!`,
      });

      // Reset form
      setDate(undefined);
      setTimeSlot(undefined);
      setAppointmentType(undefined);
      setAppointmentDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem booking your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Appointment booking dialog
  const AppointmentDialog = () => (
    <Dialog
      open={appointmentDialogOpen}
      onOpenChange={setAppointmentDialogOpen}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book your appointment</DialogTitle>
          <DialogDescription>
            Select your preferred date, time and type of appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="header-appointment-type">Appointment Type</Label>
            <Select value={appointmentType} onValueChange={setAppointmentType}>
              <SelectTrigger id="header-appointment-type">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={
                    (date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date.getDay() === 0 // Disable Sundays
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="header-time-slot">Select Time</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger id="header-time-slot">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-boutique-600 hover:bg-boutique-700"
            onClick={handleBookAppointment}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      {/* Appointment Dialog */}
      <AppointmentDialog />

      <div className="container px-4 mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-boutique-700">
          Thiya's Boutique
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-boutique-600 ${
              location.pathname === "/" ? "text-boutique-600" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium transition-colors hover:text-boutique-600 ${
              location.pathname.includes("/shop") ||
              location.pathname.includes("/product")
                ? "text-boutique-600"
                : "text-gray-600"
            }`}
          >
            Shop
          </Link>
          <Link
            to="/categories"
            className={`text-sm font-medium transition-colors hover:text-boutique-600 ${
              location.pathname.includes("/categories")
                ? "text-boutique-600"
                : "text-gray-600"
            }`}
          >
            Categories
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-boutique-600 ${
              location.pathname === "/about"
                ? "text-boutique-600"
                : "text-gray-600"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors hover:text-boutique-600 ${
              location.pathname === "/contact"
                ? "text-boutique-600"
                : "text-gray-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Search Form with Global Search Trigger */}
        <div className="hidden md:flex items-center max-w-sm flex-1 mx-4">
          <Button
            variant="outline"
            className="w-full justify-between text-left text-muted-foreground"
            onClick={() => setSearchDialogOpen(true)}
          >
            <div className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              <span>Search products...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1 border-boutique-600 text-boutique-600 hover:text-boutique-700 hover:bg-boutique-50"
            onClick={() => setAppointmentDialogOpen(true)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline-block">Book Appointment</span>
          </Button>

          {isAuthenticated ? (
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline-block">
                  {user?.name.split(" ")[0]}
                </span>
              </Button>
              <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right">
                <div className="py-1">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5 mr-2" />
                Login
              </Button>
            </Link>
          )}
          <Link to="/favorites" className="relative">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="sm">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-boutique-500 text-white">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setSearchDialogOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/favorites" className="relative p-2">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative p-2">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-boutique-500 text-white">
                {cartCount}
              </Badge>
            )}
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3">
            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Shop
              </Link>
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Categories
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAppointmentDialogOpen(true);
                }}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-boutique-600 hover:bg-gray-100"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </button>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Search Dialog */}
      <GlobalSearch isOpen={searchDialogOpen} setIsOpen={setSearchDialogOpen} />
    </header>
  );
};

export default Header;
