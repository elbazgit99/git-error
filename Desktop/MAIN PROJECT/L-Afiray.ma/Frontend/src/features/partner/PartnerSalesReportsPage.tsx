import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SalesData {
  month: string;
  sales: number;
  orders: number;
  products: number;
}

const PartnerSalesReportsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'PARTNER') {
      navigate('/login');
      return;
    }
    fetchSalesData();
  }, [user, navigate, selectedPeriod]);

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/sales/partner/${user._id}`);
      const sales = await res.json();
      // Group and aggregate sales by selectedPeriod
      let grouped = [];
      if (selectedPeriod === 'monthly') {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        grouped = months.map(month => {
          const monthSales = sales.filter(sale => {
            const d = new Date(sale.date);
            return d.getMonth() === months.indexOf(month);
          });
          return {
            month,
            sales: monthSales.reduce((sum, s) => sum + s.price, 0),
            orders: monthSales.length,
            products: monthSales.length // 1 product per sale
          };
        });
      } else if (selectedPeriod === 'quarterly') {
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        grouped = quarters.map((q, i) => {
          const quarterSales = sales.filter(sale => {
            const m = new Date(sale.date).getMonth();
            return Math.floor(m / 3) === i;
          });
          return {
            month: q,
            sales: quarterSales.reduce((sum, s) => sum + s.price, 0),
            orders: quarterSales.length,
            products: quarterSales.length
          };
        });
      } else {
        const years = Array.from(new Set(sales.map(sale => new Date(sale.date).getFullYear()))).sort();
        grouped = years.map(year => {
          const yearSales = sales.filter(sale => new Date(sale.date).getFullYear() === year);
          return {
            month: String(year),
            sales: yearSales.reduce((sum, s) => sum + s.price, 0),
            orders: yearSales.length,
            products: yearSales.length
          };
        });
      }
      setSalesData(grouped);
    } catch (err) {
      setSalesData([]);
      toast.error('Failed to load sales history');
    } finally {
      setLoading(false);
    }
  };

  const totalSales = salesData.reduce((sum, data) => sum + data.sales, 0);
  const totalOrders = salesData.reduce((sum, data) => sum + data.orders, 0);
  const totalProducts = salesData.reduce((sum, data) => sum + data.products, 0);
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  if (!user) return null;
  if (user.role !== 'PARTNER') return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/partner-dashboard')}
              variant="ghost"
              size="sm"
              className="p-2 h-auto w-auto text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white">Sales History</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {user.companyName} - Sales Performance Overview
              </p>
            </div>
          </div>
          {/* Period Selector */}
          <div className="flex gap-2">
            {(['monthly', 'quarterly', 'yearly'] as const).map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                className={selectedPeriod === period 
                  ? "bg-black text-white dark:bg-white dark:text-black" 
                  : "border-gray-300 dark:border-gray-600 text-black dark:text-white"
                }
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
                  <p className="text-2xl font-bold text-black dark:text-white">
                    {totalSales.toLocaleString()} DH
                  </p>
                </div>
                <DollarSign className="h-5 w-5 text-black dark:text-white" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-black dark:text-white">
                    {totalOrders.toLocaleString()}
                  </p>
                </div>
                <Package className="h-5 w-5 text-black dark:text-white" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Products Sold</p>
                  <p className="text-2xl font-bold text-black dark:text-white">
                    {totalProducts.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 text-black dark:text-white" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Order Value</p>
                  <p className="text-2xl font-bold text-black dark:text-white">
                    {averageOrderValue.toLocaleString()} DH
                  </p>
                </div>
                <Calendar className="h-5 w-5 text-black dark:text-white" />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Sales Chart */}
        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">
              {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading sales data...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-black dark:text-white min-w-[60px]">
                        {data.month}
                      </span>
                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <span>Orders: {data.orders}</span>
                        <span>Products: {data.products}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className="bg-black dark:bg-white h-3 rounded-full transition-all duration-500" 
                            style={{ 
                              width: `${Math.min((data.sales / Math.max(...salesData.map(d => d.sales))) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-black dark:text-white min-w-[100px] text-right">
                          {data.sales.toLocaleString()} DH
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerSalesReportsPage;
