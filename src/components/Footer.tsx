
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border/50">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">About SoulSeer</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              SoulSeer is a trusted platform for spiritual guidance, offering intuitive readings, 
              personal growth resources, and a supportive community for your spiritual journey.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} href="https://facebook.com" />
              <SocialIcon icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialIcon icon={<Instagram size={18} />} href="https://instagram.com" />
              <SocialIcon icon={<Youtube size={18} />} href="https://youtube.com" />
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink href="/tarot-reading">Tarot Reading</FooterLink>
              <FooterLink href="/astrology">Astrology</FooterLink>
              <FooterLink href="/psychic-readings">Psychic Readings</FooterLink>
              <FooterLink href="/meditation">Guided Meditation</FooterLink>
              <FooterLink href="/spiritual-coaching">Spiritual Coaching</FooterLink>
            </ul>
          </div>

          {/* Community Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <FooterLink href="/forums">Forums</FooterLink>
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/testimonials">Testimonials</FooterLink>
              <FooterLink href="/support-groups">Support Groups</FooterLink>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Stay Connected</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for spiritual insights, exclusive offers, and community updates.
            </p>
            <div className="flex flex-col space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background border-border"
              />
              <Button className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SoulSeer. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <FooterSmallLink href="/privacy">Privacy Policy</FooterSmallLink>
              <FooterSmallLink href="/terms">Terms of Service</FooterSmallLink>
              <FooterSmallLink href="/cookies">Cookie Policy</FooterSmallLink>
              <FooterSmallLink href="/accessibility">Accessibility</FooterSmallLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <Link
        to={href}
        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        {children}
      </Link>
    </li>
  );
};

const FooterSmallLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <Link
      to={href}
      className="text-muted-foreground hover:text-foreground transition-colors text-xs"
    >
      {children}
    </Link>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      aria-label="Social media"
    >
      {icon}
    </a>
  );
};

export default Footer;
