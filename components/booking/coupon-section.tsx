'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface CouponSectionProps {
  onCouponApplied: (discount: number) => void;
  onCouponRemoved: () => void;
  isApplied: boolean;
}

export default function CouponSection({ onCouponApplied, onCouponRemoved, isApplied }: CouponSectionProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validCoupons = [
    { code: 'SHEYLORPHOTOGRAPHY', discount: 15, description: '15% off all sessions' },
  ];

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const coupon = validCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
    
    if (coupon) {
      onCouponApplied(coupon.discount);
      toast.success('Coupon applied successfully!', {
        description: `${coupon.discount}% discount applied to your total.`,
      });
    } else {
      toast.error('Invalid coupon code', {
        description: 'Please check your coupon code and try again.',
      });
    }
    
    setIsLoading(false);
  };

  const removeCoupon = () => {
    onCouponRemoved();
    setCouponCode('');
    toast.success('Coupon removed');
  };

  return (
    <div className="bg-accent/5 p-4 rounded-lg space-y-3">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-accent" />
        <h3 className="font-medium">Have a Coupon Code?</h3>
      </div>
      
      {!isApplied ? (
        <div className="flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
            className="flex-1"
          />
          <Button 
            onClick={applyCoupon} 
            disabled={isLoading || !couponCode.trim()}
            size="sm"
            variant="outline"
          >
            {isLoading ? 'Applying...' : 'Apply'}
          </Button>
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
      
      {/* <p className="text-xs text-muted-foreground">
        Valid coupon code: SHEYLORPHOTOGRAPHY
      </p> */}
    </div>
  );
} 