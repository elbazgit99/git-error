import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import PrivateRoute from '@/components/PrivateRoute';
import { ThemeProvider } from "@/components/theme-provider"

// Public Pages
import LoginPage from '@/features/layout/login-form';
import RegisterPage from '@/features/layout/register';
import HomePage from '@/features/pages/HomePage';

// Moderator Dashboard Components
import ModeratorDashboardLayout from '@/features/layout/ModeratorDashboardLayout';
import UpdateUserForm from '@/components/form-update';
import UserManagementPage from '@/features/moderator/UserManagementPage';
import PartnerManagementPage from '@/features/moderator/PartnerManagementPage';
import ContentModerationPage from '@/features/moderator/ContentModerationPage';
import PlatformAnalyticsPage from '@/features/moderator/PlatformAnalyticsPage';

// Partner Dashboard Components
import PartnerDashboardLayout from '@/features/layout/PartnerDashboardLayout';
import PartnerOrdersPage from '@/features/partner/PartnerOrdersPage';
import PartnerSalesReportsPage from '@/features/partner/PartnerSalesReportsPage';
import PartnerProfilePage from '@/features/partner/PartnerProfilePage';
import PartnerListingsPage from '@/features/partner/PartnerListingsPage'; // Import the new listings page
import PartnerSalesHistoryPage from '@/features/partner/PartnerSalesHistoryPage';

// Buyer Dashboard Components
import BuyerDashboardLayout from '@/features/layout/BuyerDashboardLayout';
import BuyerProfilePage from '@/features/buyer/BuyerProfilePage';
import CarPartsCatalogPage from '@/features/buyer/CarPartsCatalogPage';
import ApprovalPendingPage from '@/features/pages/ApprovalPendingPage';
import BuyerOrdersPage from '@/features/buyer/BuyerOrdersPage';
import CheckoutPage from '@/features/buyer/CheckoutPage';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/approval-pending" element={<ApprovalPendingPage />} />
            <Route path="/parts-catalog" element={<CarPartsCatalogPage />} />

            {/* Moderator Protected Routes */}
            <Route path="/moderator-dashboard" element={<PrivateRoute roles="MODERATOR"><ModeratorDashboardLayout /></PrivateRoute>}>
              <Route index element={<UserManagementPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="users/update/:id" element={<UpdateUserForm />} />
              <Route path="partners" element={<PartnerManagementPage />} />
              <Route path="inventory" element={<PartnerListingsPage />} /> {/* Moderator can view/manage inventory via PartnerListingsPage */}
              <Route path="content-moderation" element={<ContentModerationPage />} />
              <Route path="analytics" element={<PlatformAnalyticsPage />} />
            </Route>

            {/* Partner Protected Routes */}
            <Route path="/partner-dashboard" element={<PrivateRoute roles="PARTNER"><PartnerDashboardLayout /></PrivateRoute>}>
              <Route index element={<PartnerListingsPage />} />
              <Route path="listings" element={<PartnerListingsPage />} /> {/* Render PartnerListingsPage here */}
              <Route path="orders" element={<PartnerOrdersPage />} />
              <Route path="sales-reports" element={<PartnerSalesReportsPage />} />
              <Route path="profile" element={<PartnerProfilePage />} />
            </Route>
            
            {/* Partner Sales History Route */}
            <Route path="/partner-sales-history" element={<PrivateRoute roles="PARTNER"><PartnerSalesHistoryPage /></PrivateRoute>} />
            
            {/* Test route for debugging */}
            <Route path="/test-sales" element={<PartnerSalesHistoryPage />} />

            {/* Buyer Protected Routes */}
            <Route path="/buyer-dashboard" element={<PrivateRoute roles="BUYER"><BuyerDashboardLayout /></PrivateRoute>}>
              <Route index element={<BuyerProfilePage />} />
              <Route path="profile" element={<BuyerProfilePage />} />
              <Route path="parts" element={<CarPartsCatalogPage />} />
              <Route path="orders" element={<BuyerOrdersPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>

            {/* Fallback route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
