import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle, 
  Sparkles, 
  MapPin, 
  Truck, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  selectedLocation,
  onClearCart 
}) {
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'delivery'
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.mrp * item.quantity, 0);
  const totalSavings = cartItems.reduce((acc, item) => acc + (item.savings || 0) * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 29 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsOrdered(true);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#E6F4F1]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#113222] text-[#34D399] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#113222]">Your Cart</h3>
              <p className="text-xs text-slate-500">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {isOrdered ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-[#113222]">
                Order Reserved Successfully!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your Jan Aushadhi generic order has been queued at 
                <strong className="text-slate-900"> {selectedLocation?.name || 'Hazratganj Kendra'}</strong>. 
                Show this prescription token at the counter for instant fulfillment.
              </p>

              <div className="p-4 rounded-2xl bg-[#E6F4F1] border border-[#D5EFE3] text-left text-xs space-y-1.5">
                <div className="flex justify-between font-bold text-[#113222]">
                  <span>Token Code:</span>
                  <span className="font-mono text-[#059669]">PMBJP-LKO-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Amount Payable:</span>
                  <span className="font-bold">₹{grandTotal.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-[#047857] font-bold">
                  <span>Total Money Saved:</span>
                  <span>₹{totalSavings.toFixed(1)}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-[#113222] hover:bg-[#184630] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="text-base font-bold text-slate-800">Your cart is empty</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Search a prescribed medicine and add its PMBJP generic substitute to start saving up to 90%.
              </p>
            </div>
          ) : (
            <>
              {/* Savings Announcement */}
              {totalSavings > 0 && (
                <div className="p-3.5 rounded-2xl bg-[#D5EFE3] border border-[#A7F3D0] flex items-center gap-2.5 text-xs text-[#065F46]">
                  <Sparkles className="w-4 h-4 text-[#059669] shrink-0" />
                  <span className="font-bold">
                    You are saving ₹{totalSavings.toFixed(1)} by choosing Jan Aushadhi generics!
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#047857]">
                          {item.variant}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 mt-1 leading-snug">
                          {item.name}
                        </h4>
                        {item.brandEquivalent && (
                          <div className="text-[10px] text-slate-500">
                            Equiv: {item.brandEquivalent}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-white flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#113222]">
                          ₹{(item.mrp * item.quantity).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery method selector */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-700 mb-2">Fulfillment Method</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#113222] bg-[#E6F4F1] text-[#113222]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Kendra Pickup</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">Free • Ready in 15 mins</div>
                  </button>

                  <button
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      deliveryMethod === 'delivery'
                        ? 'border-[#113222] bg-[#E6F4F1] text-[#113222]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Truck className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Doorstep (LKO)</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">₹29 • Express 2 Hours</div>
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer with Subtotal & Checkout */}
        {!isOrdered && cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Medicine Subtotal:</span>
                <span className="font-bold text-slate-900">₹{subtotal.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment ({deliveryMethod === 'pickup' ? 'Store Pickup' : 'Express Delivery'}):</span>
                <span className="font-bold text-slate-900">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#113222] pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span>₹{grandTotal.toFixed(1)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-2xl bg-[#113222] hover:bg-[#184630] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm PMBJP Reservation</span>
              <ArrowRight className="w-4 h-4 text-[#34D399]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
