'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Tag, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CouponSectionProps {
  onCouponApplied: (discount: number) => void;
  onCouponRemoved: () => void;
  isApplied: boolean;
}

export default function CouponSection({ onCouponApplied, onCouponRemoved, isApplied }: CouponSectionProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validCoupons = [
    { code: 'Sheyilor15', discount: 15, description: '15% off all sessions' },
  ];

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const coupon = validCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
    
    if (coupon) {
      onCouponApplied(coupon.discount);
      toast.success('Coupon applied successfully!', {
        description: `${coupon.discount}% discount applied to your total.`,
      });
      setCouponCode('');
    } else {
      setError('Invalid coupon code. Please check and try again.');
      toast.error('Invalid coupon code', {
        description: 'Please check your coupon code and try again.',
      });
    }
    
    setIsLoading(false);
  };

  const removeCoupon = () => {
    onCouponRemoved();
    setCouponCode('');
    setError(null);
    toast.success('Coupon removed');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyCoupon();
    }
  };

  return (
    <div className="bg-accent/5 p-4 rounded-lg space-y-3">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-accent" />
        <h3 className="font-medium">Have a Coupon Code?</h3>
      </div>
      
      {!isApplied ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`transition-all duration-200 ${
                  error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-300 focus:border-accent focus:ring-accent/20'
                }`}
              />
              {error && (
                <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </div>
              )}
            </div>
            <Button 
              onClick={applyCoupon} 
              disabled={isLoading || !couponCode.trim()}
              size="sm"
              variant="outline"
              className="min-w-[80px]"
            >
              {isLoading ? 'Applying...' : 'Apply'}
            </Button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">Invalid Coupon Code</p>
                  <p className="text-red-600 mt-1">
                    The coupon code "{couponCode}" is not valid. Please check the spelling and try again.
                  </p>
                  <p className="text-red-600 mt-2 text-xs">
                    Valid coupon code: <span className="font-mono bg-red-100 px-1 rounded">Sheyilor15</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800 font-medium">
              15% discount applied
            </span>
          </div>
          <Button
            onClick={removeCoupon}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {!isApplied && !error && (
        <p className="text-xs text-muted-foreground">
          Valid coupon code: Sheyilor15
        </p>
      )}
    </div>
  );
} 