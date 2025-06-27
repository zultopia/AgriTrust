import React, { useState } from 'react';
import { 
  Users, 
  Wallet, 
  Activity, 
  Award, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Star,
  Leaf,
  BarChart3,
  PieChart,
  DollarSign
} from 'lucide-react';

// Dummy data for community
const communityData = {
  profile: {
    name: "Tani Jawa Community",
    location: "Semarang, Central Java",
    members: 1250,
    established: "2020",
    rating: 4.8,
    description: "A thriving agricultural community focused on sustainable farming practices and innovative crop management. We specialize in organic vegetables and rice cultivation.",
    contact: {
      email: "info@tanijawa.com",
      phone: "+62-24-1234567",
      address: "Jl. Pertanian No. 123, Semarang"
    }
  },
  stats: {
    totalProjects: 45,
    activeProjects: 12,
    completedProjects: 33,
    totalRevenue: "125,000",
    monthlyGrowth: 12.5
  },
  recentActivities: [
    {
      id: 1,
      type: "project_completed",
      title: "Organic Rice Harvest",
      description: "Successfully completed organic rice cultivation project",
      date: "2 days ago",
      amount: "5,200 LUM"
    },
    {
      id: 2,
      type: "new_member",
      title: "New Member Joined",
      description: "Ahmad Subandi joined the community",
      date: "5 days ago",
      amount: null
    },
    {
      id: 3,
      type: "nft_minted",
      title: "NFT Reward Minted",
      description: "Growth Guardian NFT created for crop verification",
      date: "1 week ago",
      amount: "700 LUM"
    },
    {
      id: 4,
      type: "project_started",
      title: "Sweet Corn Cultivation",
      description: "New sweet corn farming project initiated",
      date: "2 weeks ago",
      amount: "3,500 LUM"
    }
  ],
  projects: [
    {
      id: 1,
      name: "Organic Rice Field",
      status: "Active",
      progress: 75,
      startDate: "2025-03-01",
      expectedEnd: "2025-08-30",
      investment: "8,500 LUM",
      participants: 25
    },
    {
      id: 2,
      name: "Hydroponic Vegetables",
      status: "Active",
      progress: 40,
      startDate: "2025-04-15",
      expectedEnd: "2025-09-15",
      investment: "12,000 LUM",
      participants: 18
    },
    {
      id: 3,
      name: "Corn Cultivation",
      status: "Completed",
      progress: 100,
      startDate: "2024-11-01",
      expectedEnd: "2025-04-30",
      investment: "6,200 LUM",
      participants: 32
    }
  ],
  balance: {
    totalBalance: "45,750",
    availableBalance: "32,100",
    lockedBalance: "13,650",
    recentTransactions: [
      {
        id: 1,
        type: "income",
        description: "Project completion reward",
        amount: "+5,200",
        date: "2025-06-25"
      },
      {
        id: 2,
        type: "expense",
        description: "Equipment purchase",
        amount: "-2,800",
        date: "2025-06-23"
      },
      {
        id: 3,
        type: "income",
        description: "NFT sale",
        amount: "+1,500",
        date: "2025-06-20"
      },
      {
        id: 4,
        type: "expense",
        description: "Seed investment",
        amount: "-3,200",
        date: "2025-06-18"
      }
    ]
  }
};

const StatCard = ({ icon: Icon, title, value, change, color = "emerald" }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 flex items-center gap-1 ${
            change > 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            <TrendingUp className="h-3 w-3" />
            {change > 0 ? '+' : ''}{change}%
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-500/20`}>
        <Icon className={`h-6 w-6 text-${color}-400`} />
      </div>
    </div>
  </div>
);

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_completed':
        return <Award className="h-4 w-4 text-emerald-400" />;
      case 'new_member':
        return <Users className="h-4 w-4 text-blue-400" />;
      case 'nft_minted':
        return <Star className="h-4 w-4 text-yellow-400" />;
      case 'project_started':
        return <Activity className="h-4 w-4 text-purple-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 hover:bg-gray-700/30 rounded-lg transition-colors">
      <div className="mt-1">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium">{activity.title}</p>
        <p className="text-gray-400 text-sm">{activity.description}</p>
        <p className="text-gray-500 text-xs mt-1">{activity.date}</p>
      </div>
      {activity.amount && (
        <div className="text-emerald-400 font-medium text-sm">
          {activity.amount}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-white font-semibold">{project.name}</h3>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
          project.status === 'Active' 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-gray-500/20 text-gray-400'
        }`}>
          {project.status}
        </span>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{project.investment}</p>
        <p className="text-gray-400 text-sm">{project.participants} participants</p>
      </div>
    </div>
    
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">Progress</span>
        <span className="text-white">{project.progress}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
    </div>
    
    <div className="flex justify-between text-sm text-gray-400">
      <span>Start: {project.startDate}</span>
      <span>End: {project.expectedEnd}</span>
    </div>
  </div>
);

const TransactionItem = ({ transaction }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
    <div>
      <p className="text-white font-medium">{transaction.description}</p>
      <p className="text-gray-400 text-sm">{transaction.date}</p>
    </div>
    <div className={`font-bold ${
      transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
    }`}>
      {transaction.amount} LUM
    </div>
  </div>
);

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Activity },
    { id: 'balance', label: 'Balance', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 pt-28">
        <div className="container mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{communityData.profile.name}</h1>
              <div className="flex items-center gap-4 text-emerald-100">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{communityData.profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{communityData.profile.members} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{communityData.profile.rating}</span>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-center">
                <p className="text-emerald-100 text-sm">Total Balance</p>
                <p className="text-2xl font-bold">{communityData.balance.totalBalance} LUM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Activity}
                title="Active Projects"
                value={communityData.stats.activeProjects}
                color="emerald"
              />
              <StatCard
                icon={Award}
                title="Completed Projects"
                value={communityData.stats.completedProjects}
                color="blue"
              />
              <StatCard
                icon={DollarSign}
                title="Total Revenue"
                value={`${communityData.stats.totalRevenue} LUM`}
                color="yellow"
              />
              <StatCard
                icon={TrendingUp}
                title="Monthly Growth"
                value={`${communityData.stats.monthlyGrowth}%`}
                change={communityData.stats.monthlyGrowth}
                color="purple"
              />
            </div>

            {/* Recent Activities */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Recent Activities</h2>
              </div>
              <div className="divide-y divide-gray-700">
                {communityData.recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Community Projects</h2>
              <div className="flex gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm">Total Projects</p>
                  <p className="text-xl font-bold text-white">{communityData.stats.totalProjects}</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm">Active</p>
                  <p className="text-xl font-bold text-emerald-400">{communityData.stats.activeProjects}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {communityData.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'balance' && (
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Total Balance</h3>
                  <Wallet className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-emerald-400">{communityData.balance.totalBalance} LUM</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Available</h3>
                  <DollarSign className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-blue-400">{communityData.balance.availableBalance} LUM</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Locked</h3>
                  <Activity className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-3xl font-bold text-yellow-400">{communityData.balance.lockedBalance} LUM</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
              </div>
              <div className="divide-y divide-gray-700">
                {communityData.balance.recentTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Community Info */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-6">Community Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Community Name</label>
                    <p className="text-white font-medium">{communityData.profile.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Location</label>
                    <p className="text-white font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {communityData.profile.location}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Established</label>
                    <p className="text-white font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {communityData.profile.established}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Members</label>
                    <p className="text-white font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {communityData.profile.members} active members
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Rating</label>
                    <p className="text-white font-medium flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      {communityData.profile.rating} / 5.0
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                    <Mail className="h-5 w-5 text-emerald-400 mt-1" />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{communityData.profile.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                    <Phone className="h-5 w-5 text-emerald-400 mt-1" />
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">{communityData.profile.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                    <MapPin className="h-5 w-5 text-emerald-400 mt-1" />
                    <div>
                      <p className="text-gray-400 text-sm">Address</p>
                      <p className="text-white">{communityData.profile.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">About Community</h2>
              <p className="text-gray-300 leading-relaxed">{communityData.profile.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}