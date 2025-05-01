import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  X,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  ArrowRight,
  CreditCard,
  TruckIcon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="bg-boutique-600 hover:bg-boutique-700">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {cartItems.map((item) => {
                const { product, quantity, size, color } = item;
                const itemPrice = product.discount
                  ? product.price * (1 - product.discount / 100)
                  : product.price;
                const itemSubtotal = itemPrice * quantity;

                return (
                  <div
                    key={`${product.id}-${size}-${color}`}
                    className="border-t border-gray-100 first:border-t-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-4 items-center">
                      {/* Product */}
                      <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="absolute -top-2 -left-2 bg-white rounded-full p-0.5 shadow-sm hover:bg-gray-100"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <div>
                          <Link
                            to={`/product/${product.id}`}
                            className="text-gray-900 font-medium hover:text-boutique-600"
                          >
                            {product.name}
                          </Link>
                          <div className="text-sm text-gray-500 mt-1">
                            {color && <span>Color: {color}</span>}
                            {size && <span> | Size: {size}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                        <span className="md:hidden text-sm text-gray-500">
                          Price:{" "}
                        </span>
                        <span className="font-medium ml-auto md:ml-0">
                          ${itemPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                        <span className="md:hidden text-sm text-gray-500">
                          Quantity:{" "}
                        </span>
                        <div className="flex items-center ml-auto md:ml-0">
                          <button
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            disabled={quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          <div className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300 text-gray-900">
                            {quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                            disabled={quantity >= product.stock}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-1 md:col-span-2 flex md:justify-end items-center">
                        <span className="md:hidden text-sm text-gray-500">
                          Subtotal:{" "}
                        </span>
                        <span className="font-medium ml-auto">
                          ${itemSubtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Cart Actions */}
              <div className="p-4 md:p-6 bg-gray-50 flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Clear Cart
                  </Button>
                </div>
                <Button
                  asChild
                  className="bg-boutique-600 hover:bg-boutique-700"
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="text-boutique-700">${total.toFixed(2)}</span>
                </div>

                <Separator className="my-4" />

                {/* Checkout Button */}
                <Button
                  className="w-full bg-boutique-600 hover:bg-boutique-700 flex items-center justify-center gap-2"
                  asChild
                >
                  <Link to="/checkout">
                    <CreditCard className="h-4 w-4" />
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                {/* Shipping notice */}
                <div className="mt-4 flex items-start gap-2 text-sm">
                  <TruckIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">
                    {subtotal >= 100
                      ? "You've qualified for free shipping!"
                      : `Add $${(100 - subtotal).toFixed(
                          2
                        )} more to qualify for free shipping!`}
                  </p>
                </div>

                {/* Payment methods */}
                <div className="mt-6">
                  <p className="text-xs text-gray-500 text-center mb-2">
                    We Accept
                  </p>
                  <div className="flex justify-center gap-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-3">
                Our customer service team is here to help you with any questions
                about your order.
              </p>
              <Link
                to="/contact"
                className="text-boutique-600 hover:text-boutique-700 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
