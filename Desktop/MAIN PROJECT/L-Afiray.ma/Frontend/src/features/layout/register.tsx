import React from 'react';
import {useState} from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select,
         SelectContent, 
         SelectItem, 
         SelectTrigger, 
         SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { register, loadingAuth, isAuthenticated, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'MODERATOR') {
        navigate('/moderator-dashboard', { replace: true });
      } else if (user.role === 'PARTNER') {
        // Partners should not be redirected to dashboard if not approved
        if (user.isApproved) {
          navigate('/partner-dashboard', { replace: true });
        } else {
          // Show approval pending message instead of redirecting
          navigate('/approval-pending', { replace: true });
        }
      } else if (user.role === 'BUYER') {
        navigate('/buyer-dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Handle phone number input - only allow numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers, plus sign, and spaces
    const numericValue = value.replace(/[^0-9+\s]/g, '');
    setPhone(numericValue);
  };

  // Handle key press to prevent non-numeric input
  const handlePhoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, plus sign, and numbers
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'Tab' ||
      e.key === 'Escape' ||
      e.key === 'Enter' ||
      e.key === '+' ||
      e.key === ' ' ||
      /[0-9]/.test(e.key)
    ) {
      return;
    }
    // Prevent any other key
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData: any = { name, email, password, role, phone };
    if (role === 'PARTNER') {
      userData.companyName = companyName;
      userData.companyAddress = companyAddress;
    }
    await register(userData);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-6 sm:px-12 lg:px-24">
      <div className="p-8 rounded-lg shadow-md bg-white dark:bg-black border border-gray-200 dark:border-gray-700 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-black dark:text-white">Name</Label>
            <Input id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600" />
          </div>
          <div>
            <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600" />
          </div>
          <div>
            <Label htmlFor="password" className="text-black dark:text-white">Password</Label>
            <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600" />
          </div>
          <div>
            <Label htmlFor="phone" className="text-black dark:text-white">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+212XXXXXXXXX" 
              value={phone} 
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyPress}
              pattern="[0-9+\s]+"
              inputMode="numeric"
              required 
              className="mt-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600" 
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-black dark:text-white">Role</Label>
            <Select value={role} onValueChange={setRole} required disabled={loadingAuth}>
              <SelectTrigger className="w-full mt-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600">
                <SelectItem value="PARTNER">Partner</SelectItem>
                <SelectItem value="BUYER">Buyer</SelectItem>
                {/* Moderator role registration should ideally be handled by an existing moderator, not public registration */}
                {/* <SelectItem value="MODERATOR">Moderator</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          {role === 'PARTNER' && (
            <>
              <div>
                <Label htmlFor="companyName" className="text-black dark:text-white">Company Name</Label>
                <Input id="companyName" type="text" placeholder="Your Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="mt-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="companyAddress" className="text-black dark:text-white">Company Address</Label>
                <Input id="companyAddress" type="text" placeholder="Your Company Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required className="mt-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-gray-300 dark:border-gray-600" />
              </div>

            </>
          )}



          <Button type="submit" className="w-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity" disabled={loadingAuth}>
            {loadingAuth ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-black dark:text-white underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
