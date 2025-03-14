
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Globe } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, navigate to dashboard without actual auth
    navigate('/dashboard');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg cyber:cyber-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in to SoulSeer</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="w-full">
                  <Facebook className="h-4 w-4 mr-2" />
                  <span className="sr-only md:not-sr-only md:text-xs">Facebook</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <Twitter className="h-4 w-4 mr-2" />
                  <span className="sr-only md:not-sr-only md:text-xs">Twitter</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="sr-only md:not-sr-only md:text-xs">Google</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
