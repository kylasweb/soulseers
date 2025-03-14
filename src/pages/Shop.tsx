
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Star, ShoppingCart, Filter, ArrowUpDown } from 'lucide-react';

const Shop = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Spiritual Shop</h1>
          <p className="text-lg text-muted-foreground">
            Curated products to enhance your spiritual journey
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-64 order-2 md:order-1">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground">
                        {category.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="Min" className="h-9" />
                  <span>-</span>
                  <Input type="number" placeholder="Max" className="h-9" />
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Apply
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                      <label htmlFor={`rating-${rating}`} className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'text-soulseer-gold fill-soulseer-gold cyber:text-accent cyber:fill-accent' : 'text-muted'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm">& Up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 md:order-2">
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-10 w-full md:w-80" />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="crystals">Crystals</TabsTrigger>
                <TabsTrigger value="tarot">Tarot & Oracle</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="tools">Spiritual Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="crystals" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(product => product.category === 'Crystals').map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tarot" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(product => product.category === 'Tarot & Oracle').map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="books" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(product => product.category === 'Books').map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tools" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(product => product.category === 'Spiritual Tools').map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mx-1">1</Button>
              <Button variant="outline" className="mx-1">2</Button>
              <Button variant="outline" className="mx-1">3</Button>
              <Button variant="outline" className="mx-1">...</Button>
              <Button variant="outline" className="mx-1">10</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-6 md:p-8 mt-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Exclusive Member Benefits</h2>
            <p className="mb-6 text-muted-foreground">
              Join our membership program to receive exclusive discounts, early access to new products, and more.
            </p>
            <Button>Become a Member</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ProductCard = ({ product }) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.sale && (
          <Badge className="absolute top-2 right-2 bg-soulseer-gold dark:bg-soulseer-blue cyber:bg-accent">
            SALE
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < product.rating
                    ? 'text-soulseer-gold fill-soulseer-gold cyber:text-accent cyber:fill-accent'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="font-bold mr-2">${product.salePrice}</span>
                <span className="text-sm line-through text-muted-foreground">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="font-bold">${product.price}</span>
            )}
          </div>
          <Button size="sm" variant="outline" className="h-9 w-9 p-0">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const categories = [
  { id: 1, name: 'All Categories' },
  { id: 2, name: 'Crystals & Gemstones' },
  { id: 3, name: 'Tarot & Oracle Cards' },
  { id: 4, name: 'Spiritual Books' },
  { id: 5, name: 'Meditation Supplies' },
  { id: 6, name: 'Ritual Tools' },
  { id: 7, name: 'Incense & Smudging' },
  { id: 8, name: 'Altar Decorations' },
  { id: 9, name: 'Jewelry' }
];

const products = [
  {
    id: 1,
    name: 'Amethyst Crystal Cluster',
    category: 'Crystals',
    price: 34.99,
    salePrice: null,
    rating: 4.5,
    reviews: 128,
    sale: false,
    image: 'https://images.unsplash.com/photo-1613538738146-d461af610059?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    name: 'Mystical Realm Tarot Deck',
    category: 'Tarot & Oracle',
    price: 29.99,
    salePrice: 24.99,
    rating: 5,
    reviews: 94,
    sale: true,
    image: 'https://images.unsplash.com/photo-1659873229884-922304b9e145?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    name: 'Meditation Cushion Set',
    category: 'Spiritual Tools',
    price: 49.99,
    salePrice: null,
    rating: 4,
    reviews: 56,
    sale: false,
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    name: 'Spiritual Growth Journal',
    category: 'Books',
    price: 19.99,
    salePrice: null,
    rating: 4.5,
    reviews: 42,
    sale: false,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    name: 'Crystal Healing Set',
    category: 'Crystals',
    price: 59.99,
    salePrice: 49.99,
    rating: 4.5,
    reviews: 78,
    sale: true,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    name: 'Chakra Balancing Incense Bundle',
    category: 'Spiritual Tools',
    price: 14.99,
    salePrice: null,
    rating: 4,
    reviews: 36,
    sale: false,
    image: 'https://images.unsplash.com/photo-1519909655288-8c57e4f7fdb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

export default Shop;
