import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { DollarSign, Clock, Calendar, CreditCard, ArrowLeft, ShieldCheck } from 'lucide-react';
import { PaymentProvider } from '@/utils/paymentUtils';
import { useToast } from '@/components/ui/use-toast';

// Add Paypal icon since it's not in lucide-react
const PayPal = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M7 11.5l1.5-9H15c2.1 0 3.6 1.9 3 4-0.6 2.1-2.7 4-5 4H8.5L7 11.5z"></path>
    <path d="M3.5 21.5l1.5-9H10c2.1 0 3.6 1.9 3 4-0.6 2.1-2.7 4-5 4H5L3.5 21.5z"></path>
  </svg>
);

const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  message: z.string().optional(),
  paymentMethod: z.enum(['stripe', 'paypal'], {
    required_error: 'Please select a payment method',
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const ConsultationBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get data from location state if available
  const serviceTitle = location.state?.title || "Live Psychic Consultation";
  const expertName = location.state?.expertName || "Alexandra Rivers";
  const rate = location.state?.rate || 2.99;
  const minDuration = location.state?.minDuration || 15;
  const communicationType = location.state?.communicationType || "video";
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      paymentMethod: 'stripe',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = (data: BookingFormValues) => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Payment Authorized",
        description: "Your payment method has been authorized. You'll only be charged for the time you use.",
        duration: 3000,
      });
      
      // Navigate to the consultation session
      navigate('/consultations/session', {
        state: {
          communicationType,
          rate,
          minDuration,
          expertName,
          title: serviceTitle,
          paymentMethod: data.paymentMethod
        }
      });
    }, 1500);
    
    console.log(data);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/services')} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">{serviceTitle}</h1>
            <p className="text-muted-foreground mb-8">
              You're about to start a pay-per-minute {communicationType} consultation with {expertName}. 
              Please provide your information and payment details to proceed.
            </p>
            
            <div className="space-y-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-primary mr-2" />
                      <span>Rate</span>
                    </div>
                    <div className="font-medium">${rate} per minute</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <span>Minimum Duration</span>
                    </div>
                    <div className="font-medium">{minDuration} minutes</div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <p className="text-sm text-yellow-800">
                  You will be charged <span className="font-bold">${rate}</span> per minute once the consultation starts. 
                  A $5 hold will be placed on your payment method and actual charges will be calculated based on your session duration.
                </p>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-700">Secure Payment</h3>
                      <p className="text-sm text-muted-foreground">
                        All payments are processed securely. Your payment details are never stored on our servers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Booking</CardTitle>
                <CardDescription>Enter your details to proceed with the consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any specific questions or topics you'd like to discuss?" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Share any details that might help your consultant prepare.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="border rounded-lg p-4">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                                  <FormControl>
                                    <RadioGroupItem value="stripe" />
                                  </FormControl>
                                  <FormLabel className="cursor-pointer flex items-center">
                                    <CreditCard className="h-5 w-5 mr-2" /> Credit/Debit Card
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                                  <FormControl>
                                    <RadioGroupItem value="paypal" />
                                  </FormControl>
                                  <FormLabel className="cursor-pointer flex items-center">
                                    <PayPal /> PayPal
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {paymentMethod === 'stripe' && (
                        <div className="space-y-4 mt-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="4242 4242 4242 4242" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cardExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cardCvc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVC</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'paypal' && (
                        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                          <p className="text-sm">
                            You will be redirected to PayPal to complete your payment authorization after clicking "Proceed".
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Proceed to Consultation'}
                        {!isLoading && <CreditCard className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConsultationBooking;
