
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Upload, UserCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const readerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
  bio: z.string().min(50, { message: 'Bio should be at least 50 characters' }),
  specialties: z.array(z.string()).min(1, { message: 'Please select at least one specialty' }),
  experience: z.string({required_error: 'Please select your experience level'}),
  communicationTypes: z.array(z.enum(['video', 'audio', 'chat']), {
    required_error: 'Please select at least one communication type',
  }).min(1, { message: 'Please select at least one communication type' }),
  ratePerMinute: z.string().min(1, { message: 'Please enter your rate per minute' }),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ReaderFormValues = z.infer<typeof readerSchema>;

const specialtiesOptions = [
  { id: 'tarot', label: 'Tarot Reading' },
  { id: 'astrology', label: 'Astrology' },
  { id: 'numerology', label: 'Numerology' },
  { id: 'palmistry', label: 'Palmistry' },
  { id: 'medium', label: 'Medium' },
  { id: 'psychic', label: 'Psychic Reading' },
  { id: 'energy', label: 'Energy Healing' },
  { id: 'dream', label: 'Dream Interpretation' },
];

const communicationTypesOptions = [
  { id: 'video', label: 'Video Call' },
  { id: 'audio', label: 'Audio Call' },
  { id: 'chat', label: 'Chat' },
];

const ReaderSignup = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ReaderFormValues>({
    resolver: zodResolver(readerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
      specialties: [],
      experience: '',
      communicationTypes: [],
      ratePerMinute: '',
      terms: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const onSubmit = (data: ReaderFormValues) => {
    setUploading(true);
    
    // This would be replaced with actual API call
    console.log('Registration data:', data);
    console.log('Profile image:', profileImage);
    
    // Simulate API call delay
    setTimeout(() => {
      setUploading(false);
      
      toast({
        title: "Registration Successful",
        description: "Your application has been submitted for review. We'll contact you soon.",
        duration: 5000,
      });
      
      // Redirect to reader dashboard
      navigate('/reader/dashboard');
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="mb-6"
          >
            <Link to="/">Back to Home</Link>
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Become a SoulSeer Reader</CardTitle>
              <CardDescription className="text-center">
                Join our community of psychic readers and start earning by helping others on their spiritual journey
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
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
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="profileImage">Profile Image</Label>
                      <div className="mt-1 flex items-center gap-x-3">
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {profileImage ? (
                            <img 
                              src={URL.createObjectURL(profileImage)} 
                              alt="Profile preview" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <UserCircle className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <Button type="button" variant="outline" asChild>
                          <Label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                            <Input
                              id="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </Label>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        A professional photo helps build trust with potential clients
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Professional Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your background, skills, and what you specialize in..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed on your public profile
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialties"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Specialties</FormLabel>
                            <FormDescription>
                              Select the services you can provide
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {specialtiesOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="specialties"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-3"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, option.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== option.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal cursor-pointer">
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
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your years of experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                              <SelectItem value="experienced">Experienced (6-10 years)</SelectItem>
                              <SelectItem value="expert">Expert (10+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="communicationTypes"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Communication Types</FormLabel>
                            <FormDescription>
                              Select the ways you can communicate with clients
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {communicationTypesOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="communicationTypes"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-3"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id as any)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, option.id as any])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== option.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal cursor-pointer">
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
                    
                    <FormField
                      control={form.control}
                      name="ratePerMinute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate per Minute ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0.1" 
                              step="0.01" 
                              placeholder="e.g. 1.99" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Set your per-minute rate for consultations (USD)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the <Link to="/terms" className="text-primary underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>
                          </FormLabel>
                          <FormDescription>
                            By submitting this form, you agree to our verification process and reader guidelines
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={uploading}>
                    {uploading ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter>
              <p className="text-sm text-center text-muted-foreground w-full">
                Already a registered reader? <Link to="/login" className="text-primary underline">Sign in here</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReaderSignup;
