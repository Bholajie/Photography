"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { PackageType } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import PriceCalculator from "./price-calculator"
import CouponSection from "./coupon-section"

const bookingFormSchema = z.object({
  packageId: z.string({
    required_error: "Please select a package",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  location: z.string().optional(),
  locationType: z.string().optional(),
  address: z.string().optional(),
  additionalOptions: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
  numberOfOutfits: z.number().min(1, {
    message: "Please select a valid number of outfits",
  }),
  couponCode: z.string().optional(),
  discountPercentage: z.number().optional(),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

interface BookingFormProps {
  packages: PackageType[]
  selectedPackageId?: string
}

export default function BookingForm({ packages, selectedPackageId }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null)
  const [selectedLocationType, setSelectedLocationType] = useState<string>("")
  const [numberOfOutfits, setNumberOfOutfits] = useState<number>(1)
  const [discountPercentage, setDiscountPercentage] = useState<number>(0)
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      packageId: selectedPackageId || "",
      name: "",
      email: "",
      phone: "",
      location: "",
      locationType: "",
      address: "",
      additionalOptions: [],
      additionalInfo: "",
      time: "",
      numberOfOutfits: 1,
    },
  })

  useEffect(() => {
    if (selectedPackageId) {
      form.setValue("packageId", selectedPackageId)
      const pkg = packages.find(p => p.id === selectedPackageId)
      setSelectedPackage(pkg || null)
    }
  }, [selectedPackageId, packages, form])

  const getLogisticsFee = (location: string) => {
    switch (location) {
      case "mainland":
        return 25000
      case "ikoyi-lekki":
        return 35000
      case "lekki2-ajah":
        return 40000
      default:
        return 0
    }
  }

  const getHomeServiceFee = (location: string) => {
    switch (location) {
      case "mainland":
        return 55000
      case "vi-ikoyi":
        return 85000
      case "lekki-lekki2":
        return 105000
      default:
        return 0
    }
  }

  const additionalOptions = [
    { id: "express", label: "Express Service (+₦20,000)" },
    { id: "extra-selections", label: "Extra Selections (+₦10,000 per extra)" },
    { id: "photobook-30", label: "Photobook 30 pages (+₦150,000)" },
    { id: "photobook-40", label: "Photobook 40 pages (+₦180,000)" },
    { id: "frame", label: "Large Frame (+₦35,000)" },
    { id: "flash-drive", label: "Extra Flash Drive (+₦10,000)" },
    { id: "drone", label: "Drone Coverage (+₦100,000 per day)" },
  ]

  const locationOptions = [
    { id: "studio", label: "Studio Session (No additional fee)" },
    { id: "outdoor", label: "Outdoor Session" },
    { id: "home", label: "Home Service Studio Setup" },
  ]

  const outdoorLocations = [
    { id: "mainland", label: "Mainland (₦25,000)" },
    { id: "ikoyi-lekki", label: "Ikoyi/Lekki (₦35,000)" },
    { id: "lekki2-ajah", label: "Lekki 2/Ajah (₦40,000)" },
  ]

  const homeLocations = [
    { id: "mainland", label: "Mainland (₦55,000)" },
    { id: "vi-ikoyi", label: "VI/Ikoyi (₦85,000)" },
    { id: "lekki-lekki2", label: "Lekki/Lekki 2 (₦105,000)" },
  ]

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      const formDataWithCoupon = {
        ...data,
        couponCode: discountPercentage > 0 ? 'Sheyilor15' : undefined,
        discountPercentage: discountPercentage > 0 ? discountPercentage : undefined,
      };

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithCoupon),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Booking Request Sent", {
          description: "We'll get back to you shortly to confirm your booking.",
        });
        form.reset();
        setSelectedPackage(null);
        setDiscountPercentage(0);
      } else {
        throw new Error("Failed to send booking request");
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to send booking request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCouponApplied = (discount: number) => {
    setDiscountPercentage(discount);
  };

  const handleCouponRemoved = () => {
    setDiscountPercentage(0);
  };

  return (
    <div id="booking-form" className="bg-card rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-display mb-6">Book Your Session</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="packageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Package</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    const pkg = packages.find(p => p.id === value);
                    setSelectedPackage(pkg || null);
                  }} 
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait Session</SelectItem>
                    <SelectItem value="family-portrait">Family/Group Portrait</SelectItem>
                    <SelectItem value="fashion-collection">Fashion Collection Shoot</SelectItem>
                    <SelectItem value="convocation">Convocation Session</SelectItem>
                    <SelectItem value="call-to-bar">Call to Bar Session</SelectItem>
                    <SelectItem value="event-quarter">Quarter Day Event</SelectItem>
                    <SelectItem value="event-half">Half Day Event</SelectItem>
                    <SelectItem value="event-full">Full Day Event</SelectItem>
                    <SelectItem value="event-video-basic">Basic Photo + Video</SelectItem>
                    <SelectItem value="event-video-classic">Classic Photo + Video</SelectItem>
                    <SelectItem value="event-video-deluxe">Deluxe Photo + Video</SelectItem>
                    <SelectItem value="wedding">Wedding Photography</SelectItem>
                    <SelectItem value="training-full">6 Weeks Full Photography Training</SelectItem>
                    <SelectItem value="training-intensive">4 Weeks Intensive Training</SelectItem>
                    <SelectItem value="training-editing">2-Day Editing Masterclass</SelectItem>
                    <SelectItem value="training-lighting">2-Day Lighting Masterclass</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedPackage && (
            <div className="bg-accent/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Package Details</h3>
              {selectedPackage.id === "wedding" ? (
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">Let's document your lovely union! We'll schedule a consultation call with our lead photographer to discuss your wedding photography needs.</p>
                  <p className="text-muted-foreground">Please provide your contact details below, and we'll contact you within 24 hours to schedule the consultation.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-2">{selectedPackage.shortDescription}</p>
                  <div className="text-sm space-y-1">
                    <p>Price: ₦{selectedPackage.price.toLocaleString()}{selectedPackage.priceSuffix}</p>
                    <p>Duration: {selectedPackage.duration}</p>
                    <ul className="mt-2 space-y-1">
                      {selectedPackage.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}

          {selectedPackage && (
            <>
              {(selectedPackage.id === "portrait" || selectedPackage.id === "family-portrait" || selectedPackage.id === "fashion-collection") && (
                <>
                  <FormField
                    control={form.control}
                    name="locationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Location Type</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedLocationType(value);
                          }} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locationOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedLocationType === "outdoor" && (
                    <>
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area Location</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select area location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {outdoorLocations.map((option) => (
                                  <SelectItem key={option.id} value={option.id}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exact Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide the complete address where the shoot will take place..."
                                className="resize-y min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Please provide the full address including landmarks or directions to help us locate the shoot location easily.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {selectedLocationType === "home" && (
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Home Service Location</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select home service location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {homeLocations.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              {(selectedPackage.id === "portrait" || selectedPackage.id === "family-portrait" || selectedPackage.id === "fashion-collection") && (
                <FormField
                  control={form.control}
                  name="numberOfOutfits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Outfits</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value)
                            field.onChange(value)
                            setNumberOfOutfits(value)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Select the number of outfits for your session
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedPackage.id.startsWith("event-") && (
                <FormField
                  control={form.control}
                  name="additionalOptions"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Additional Options</FormLabel>
                        <FormDescription>
                          Select any additional services you'd like to add to your package
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {additionalOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="additionalOptions"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value || [], option.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <PriceCalculator
                selectedPackage={selectedPackage}
                numberOfOutfits={selectedPackage.id === "portrait" || selectedPackage.id === "family-portrait" || selectedPackage.id === "fashion-collection" ? numberOfOutfits : 1}
                locationType={selectedLocationType}
                location={form.watch("location") || ""}
                additionalOptions={form.watch("additionalOptions") || []}
                discountPercentage={discountPercentage}
              />

              <CouponSection
                onCouponApplied={handleCouponApplied}
                onCouponRemoved={handleCouponRemoved}
                isApplied={discountPercentage > 0}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date < new Date(new Date().setHours(0, 0, 0, 0)) || // Can't book past dates
                        date.getDay() === 0 // No Sundays
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="06:30">6:30 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="07:30">7:30 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="08:30">8:30 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="09:30">9:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="10:30">10:30 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="12:30">12:30 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="13:30">1:30 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="14:30">2:30 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="15:30">3:30 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="16:30">4:30 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="17:30">5:30 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="18:30">6:30 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="19:30">7:30 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="20:30">8:30 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="21:30">9:30 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="22:30">10:30 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                    <SelectItem value="23:30">11:30 PM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us more about what you're looking for with this session..."
                      className="resize-y min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Any specific requirements or preferences for your session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Book Session"}
          </Button>
        </form>
      </Form>
    </div>
  )
}