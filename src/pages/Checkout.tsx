
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [step, setStep] = useState(1);
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateStep1 = () => {
    let valid = true;
    const errors = { ...formErrors };
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      valid = false;
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Invalid email format';
      valid = false;
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      valid = false;
    }
    
    if (!formData.city.trim()) {
      errors.city = 'City is required';
      valid = false;
    }
    
    if (!formData.state.trim()) {
      errors.state = 'State is required';
      valid = false;
    }
    
    if (!formData.zipCode.trim()) {
      errors.zipCode = 'ZIP Code is required';
      valid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };
  
  const validateStep2 = () => {
    let valid = true;
    const errors = { ...formErrors };
    
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = 'Card number is required';
        valid = false;
      } else if (!formData.cardNumber.match(/^\d{16}$/)) {
        errors.cardNumber = 'Card number must be 16 digits';
        valid = false;
      }
      
      if (!formData.cardName.trim()) {
        errors.cardName = 'Name on card is required';
        valid = false;
      }
      
      if (!formData.expiryDate.trim()) {
        errors.expiryDate = 'Expiry date is required';
        valid = false;
      } else if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        errors.expiryDate = 'Invalid format (MM/YY)';
        valid = false;
      }
      
      if (!formData.cvv.trim()) {
        errors.cvv = 'CVV is required';
        valid = false;
      } else if (!formData.cvv.match(/^\d{3,4}$/)) {
        errors.cvv = 'CVV must be 3 or 4 digits';
        valid = false;
      }
    }
    
    setFormErrors(errors);
    return valid;
  };
  
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };
  
  const handlePrevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 2 && validateStep2()) {
      // Submit order - in a real app, this would send data to the server
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your purchase! Your order has been placed.",
      });
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
    }
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <div className="max-w-6xl mx-auto">
          {/* Checkout steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-boutique-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`h-1 w-24 ${step >= 2 ? 'bg-boutique-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-boutique-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`h-1 w-24 ${step >= 3 ? 'bg-boutique-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-boutique-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-32 text-center text-sm text-gray-600">
                Shipping
              </div>
              <div className="w-32 text-center text-sm text-gray-600">
                Payment
              </div>
              <div className="w-32 text-center text-sm text-gray-600">
                Confirmation
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <div className="w-full lg:w-2/3">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {step === 1 && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={formErrors.firstName ? 'border-red-500' : ''}
                        />
                        {formErrors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={formErrors.lastName ? 'border-red-500' : ''}
                        />
                        {formErrors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={formErrors.email ? 'border-red-500' : ''}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={formErrors.phone ? 'border-red-500' : ''}
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={formErrors.address ? 'border-red-500' : ''}
                        />
                        {formErrors.address && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={formErrors.city ? 'border-red-500' : ''}
                        />
                        {formErrors.city && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={formErrors.state ? 'border-red-500' : ''}
                          />
                          {formErrors.state && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className={formErrors.zipCode ? 'border-red-500' : ''}
                          />
                          {formErrors.zipCode && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.zipCode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-boutique-600 hover:bg-boutique-700"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
                    
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex-1">Credit Card</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border p-4 rounded-md opacity-50">
                        <RadioGroupItem value="razorpay" id="razorpay" disabled />
                        <Label htmlFor="razorpay" className="flex-1">Razorpay (Coming Soon)</Label>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      </div>
                    </RadioGroup>
                    
                    {formData.paymentMethod === 'credit-card' && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={16}
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={formErrors.cardNumber ? 'border-red-500' : ''}
                          />
                          {formErrors.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={formErrors.cardName ? 'border-red-500' : ''}
                          />
                          {formErrors.cardName && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.cardName}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={formData.expiryDate}
                              onChange={handleChange}
                              className={formErrors.expiryDate ? 'border-red-500' : ''}
                            />
                            {formErrors.expiryDate && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              type="password"
                              placeholder="123"
                              maxLength={4}
                              value={formData.cvv}
                              onChange={handleChange}
                              className={formErrors.cvv ? 'border-red-500' : ''}
                            />
                            {formErrors.cvv && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                      >
                        Back
                      </Button>
                      
                      <Button
                        type="submit"
                        className="bg-boutique-600 hover:bg-boutique-700"
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const { product, quantity, size, color } = item;
                      const itemPrice = product.discount
                        ? product.price * (1 - product.discount / 100)
                        : product.price;
                      
                      return (
                        <div key={`${product.id}-${size}-${color}`} className="flex gap-3">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                            <div className="text-xs text-gray-500">
                              {color && <span>Color: {color} | </span>}
                              {size && <span>Size: {size} | </span>}
                              <span>Qty: {quantity}</span>
                            </div>
                            <div className="mt-1 text-sm font-medium text-gray-900">
                              ${(itemPrice * quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span className="text-boutique-700">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
