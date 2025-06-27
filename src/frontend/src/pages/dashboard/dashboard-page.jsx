import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  Coins, 
  Eye, 
  ChevronRight, 
  Zap, 
  Droplets, 
  TreePine, 
  Recycle,
  Award,
  Calendar,
  MapPin,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  Sun,
  Cloud,
  CloudRain,
  Wind
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Cell, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data
  const tokenData = [
    { name: 'Jan', value: 1200, carbon: 800 },
    { name: 'Feb', value: 1800, carbon: 1100 },
    { name: 'Mar', value: 2400, carbon: 1500 },
    { name: 'Apr', value: 2800, carbon: 1800 },
    { name: 'May', value: 3200, carbon: 2100 },
    { name: 'Jun', value: 3800, carbon: 2400 },
    { name: 'Jul', value: 4200, carbon: 2700 }
  ];

  const impactData = [
    { name: 'Carbon Offset', value: 45, color: '#10B981' },
    { name: 'Water Saved', value: 30, color: '#3B82F6' },
    { name: 'Soil Health', value: 15, color: '#8B5CF6' },
    { name: 'Biodiversity', value: 10, color: '#F59E0B' }
  ];

  const projectData = [
    { name: 'Active', value: 12 },
    { name: 'Completed', value: 8 },
    { name: 'Pending', value: 4 }
  ];

  const weatherData = [
    { day: 'Mon', temp: 24, humidity: 65 },
    { day: 'Tue', temp: 26, humidity: 70 },
    { day: 'Wed', temp: 23, humidity: 60 },
    { day: 'Thu', temp: 25, humidity: 68 },
    { day: 'Fri', temp: 27, humidity: 72 },
    { day: 'Sat', temp: 28, humidity: 75 },
    { day: 'Sun', temp: 26, humidity: 69 }
  ];

  const StatCard = ({ icon: Icon, title, value, change, color, trend }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {trend && (
            <div className="flex items-center text-xs text-emerald-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              {trend}
            </div>
          )}
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-white text-2xl font-bold mb-2">{value}</p>
        {change && (
          <p className="text-emerald-400 text-sm flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            {change} from last month
          </p>
        )}
      </div>
    </div>
  );

  const QuickAction = ({ icon: Icon, title, description, color }) => (
    <div className="group cursor-pointer rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/40 p-4 transition-all duration-300 hover:border-emerald-500/50 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-medium text-sm">{title}</h4>
          <p className="text-gray-400 text-xs">{description}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-500 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/20 pt-24 pb-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Welcome back! Here's your agricultural impact overview.</p>
            </div>
            <div className="text-right">
              <div className="text-emerald-400 text-sm font-medium">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-white text-lg font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
          
          {/* Period Selector */}
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedPeriod === period
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Coins}
            title="LUM Balance"
            value="4,247 LUM"
            change="+12.5%"
            trend="+5.2%"
            color="from-emerald-500 to-emerald-600"
          />
          <StatCard
            icon={TreePine}
            title="Carbon Credits"
            value="2,681 tCO₂"
            change="+8.3%"
            trend="+3.1%"
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Users}
            title="Active Projects"
            value="24"
            change="+2"
            trend="+8.7%"
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            icon={Award}
            title="Impact Score"
            value="892"
            change="+45"
            trend="+12.3%"
            color="from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Token Performance Chart */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Token Performance</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">LUM Tokens</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Carbon Credits</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tokenData}>
                  <defs>
                    <linearGradient id="colorLUM" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Area type="monotone" dataKey="value" stroke="#10B981" fillOpacity={1} fill="url(#colorLUM)" strokeWidth={2} />
                  <Area type="monotone" dataKey="carbon" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCarbon)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm p-6">
            <h2 className="text-xl font-bold text-white mb-6">Environmental Impact</h2>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart data={impactData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                    {impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {impactData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Weather Widget */}
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Sun className="h-5 w-5 text-yellow-400 mr-2" />
              Weather Forecast
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                <div className="flex items-center">
                  <Sun className="h-8 w-8 text-yellow-400 mr-3" />
                  <div>
                    <p className="text-white font-bold text-2xl">24°C</p>
                    <p className="text-gray-300 text-sm">Sunny</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 text-sm">Humidity</p>
                  <p className="text-white font-bold">68%</p>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {weatherData.map((day, index) => (
                  <div key={index} className="text-center p-2 rounded-lg bg-gray-800/50">
                    <p className="text-gray-400 text-xs">{day.day}</p>
                    <p className="text-white text-sm font-bold">{day.temp}°</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm p-6">
            <h2 className="text-xl font-bold text-white mb-6">Project Status</h2>
            <div className="h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Projects</span>
                <span className="text-white font-bold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Success Rate</span>
                <span className="text-emerald-400 font-bold">89.2%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <QuickAction
                icon={Zap}
                title="New Project"
                description="Start a new agricultural project"
                color="from-emerald-500 to-emerald-600"
              />
              <QuickAction
                icon={Eye}
                title="AI Scan"
                description="Analyze crop health with AI"
                color="from-blue-500 to-blue-600"
              />
              <QuickAction
                icon={Droplets}
                title="Water Management"
                description="Monitor irrigation systems"
                color="from-cyan-500 to-cyan-600"
              />
              <QuickAction
                icon={Recycle}
                title="Carbon Trading"
                description="Trade carbon credits"
                color="from-green-500 to-green-600"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Activity className="h-5 w-5 text-emerald-400 mr-2" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { icon: TreePine, title: "Carbon Credits Issued", description: "125 tCO₂ credits added to your portfolio", time: "2 hours ago", color: "text-green-400" },
              { icon: Coins, title: "LUM Tokens Earned", description: "Received 45 LUM tokens from project completion", time: "5 hours ago", color: "text-emerald-400" },
              { icon: Eye, title: "AI Scan Completed", description: "Crop health analysis finished for Field #7", time: "1 day ago", color: "text-blue-400" },
              { icon: Users, title: "New Community Member", description: "John Doe joined your farming collective", time: "2 days ago", color: "text-purple-400" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                <div className={`p-2 rounded-lg bg-gray-700`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{activity.title}</h4>
                  <p className="text-gray-400 text-sm">{activity.description}</p>
                </div>
                <div className="text-gray-500 text-xs">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;