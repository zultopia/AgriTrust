import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, Star, MapPin, Phone, MessageCircle } from 'lucide-react';

const nftData = [
  {
    id: 1,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Tani Jawa",
    community: "Kacang Tanah",
    availableUntil: "24/07/2025",
    quality: "Grade A",
    status: "Product Available",
    contacts: {
      telegram: "@kacangsemarang",
      whatsapp: "+6281200000000",
      phone: "+6281200000000"
    },
    fullDescription: "Support local farmers to help improve the environment and improve the economy. This project will involve monthly farming activities, weekly progress reports, and bi-weekly team meetings. We'll establish farming clusters focusing on AI ethics, blockchain applications, and sustainable tech solutions. Each participant will contribute to at least one research paper and present findings at our virtual symposium. The project aims to foster a comprehensive knowledge base in emerging technologies and their societal implications through collaborative research. We'll explore ethical considerations, potential applications, and risk mitigation strategies. Regular workshops and expert sessions will be conducted to ensure high-quality research output. The final deliverables will include research papers, case studies, and policy recommendations that can guide future implementations.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  },
  {
    id: 2,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Ahmad Subandi",
    community: "Padi Organik",
    availableUntil: "25/07/2025",
    quality: "Grade B",
    status: "Coming Soon",
    contacts: {
      telegram: "@padisemarang",
      whatsapp: "+6281300000000",
      phone: "+6281300000000"
    },
    fullDescription: "Organic rice farming initiative focused on sustainable agriculture practices and community development.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  },
  {
    id: 3,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Siti Nurhaliza",
    community: "Jagung Manis",
    availableUntil: "26/07/2025",
    quality: "Grade A",
    status: "Product Available",
    contacts: {
      telegram: "@jagungsemarang",
      whatsapp: "+6281400000000",
      phone: "+6281400000000"
    },
    fullDescription: "Sweet corn cultivation project with focus on modern farming techniques and market distribution.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  },
  {
    id: 4,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Budi Santoso",
    community: "Cabai Rawit",
    availableUntil: "27/07/2025",
    quality: "Grade A",
    status: "Product Available",
    contacts: {
      telegram: "@cabaisemarang",
      whatsapp: "+6281500000000",
      phone: "+6281500000000"
    },
    fullDescription: "Chili pepper farming project emphasizing organic practices and sustainable harvesting methods.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  },
  {
    id: 5,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Indra Wijaya",
    community: "Tomat Hidroponik",
    availableUntil: "28/07/2025",
    quality: "Grade B",
    status: "Product Available",
    contacts: {
      telegram: "@tomatsemarang",
      whatsapp: "+6281600000000",
      phone: "+6281600000000"
    },
    fullDescription: "Hydroponic tomato cultivation using advanced growing systems and nutrient management.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  },
  {
    id: 6,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Rina Kartika",
    community: "Selada Organik",
    availableUntil: "29/07/2025",
    quality: "Grade A",
    status: "Coming Soon",
    contacts: {
      telegram: "@seladasemarang",
      whatsapp: "+6281700000000",
      phone: "+6281700000000"
    },
    fullDescription: "Organic lettuce farming with emphasis on pesticide-free cultivation and fresh market supply.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  },
  {
    id: 7,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Joko Widodo",
    community: "Kentang Ungu",
    availableUntil: "30/07/2025",
    quality: "Grade A",
    status: "Product Available",
    contacts: {
      telegram: "@kentangsemarang",
      whatsapp: "+6281800000000",
      phone: "+6281800000000"
    },
    fullDescription: "Purple potato cultivation project focusing on specialty varieties and premium market positioning.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  },
  {
    id: 8,
    title: "Growth Guardian",
    description: "For those who actively participate in crop verification",
    price: "700 LUM",
    image: "/api/placeholder/200/200",
    owner: "Maya Sari",
    community: "Bayam Hijau",
    availableUntil: "31/07/2025",
    quality: "Grade B",
    status: "Product Available",
    contacts: {
      telegram: "@bayamsemarang",
      whatsapp: "+6281900000000",
      phone: "+6281900000000"
    },
    fullDescription: "Green spinach cultivation with focus on nutritional value and sustainable farming practices.",
    gallery: [
      "/images/kentang.png",
      "/images/kentang.png",
      "/images/kentang.png"
    ]
  }
];

const NFTCard = ({ nft, onClick }) => (
  <div 
    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors"
    onClick={() => onClick(nft)}
  >
    <div className="relative">
      <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-orange-600 bg-orange-500 flex items-center justify-center">
          <div className="text-2xl">🌾</div>
        </div>
      </div>
      <div className="absolute top-2 left-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
        R
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="text-white font-semibold mb-1">{nft.title}</h3>
      <p className="text-gray-400 text-sm mb-3">{nft.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-white font-medium">{nft.price}</span>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
          Login to Redeem
        </button>
      </div>
    </div>
  </div>
);

const NFTDetail = ({ nft, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    {/* Header */}
    <div className="relative h-64 bg-gradient-to-r from-amber-600 to-orange-500 overflow-hidden pt-16">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 p-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <h1 className="text-4xl font-bold mb-2">{nft.community}</h1>
        <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
          {nft.status}
        </div>
      </div>
    </div>

    <div className="container mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Product Description */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">Product Description</h2>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-300 leading-relaxed">
                {nft.fullDescription}
              </p>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">Gallery</h2>
            <div className="grid grid-cols-3 gap-4">
              {nft.gallery.map((image, index) => (
                <div key={index} className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Want to Buy */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Want to Buy?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300">{nft.contacts.telegram}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300">{nft.contacts.telegram}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300">{nft.contacts.whatsapp}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Lokasi Produk Fisik
            </button>
          </div>

          {/* Product Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Product Details</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm">Community</span>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-white">{nft.owner}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Available Until</span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-white">{nft.availableUntil}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Quality</span>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span className="text-white">{nft.quality}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function NFTPage() {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [activeTab, setActiveTab] = useState('NFT REWARD');

  if (selectedNFT) {
    return <NFTDetail nft={selectedNFT} onBack={() => setSelectedNFT(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 p-6 pt-24">
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'NFT REWARD' 
                ? 'bg-white text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('NFT REWARD')}
          >
            NFT REWARD
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'MY NFT' 
                ? 'bg-white text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('MY NFT')}
          >
            MY NFT
          </button>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nftData.map((nft) => (
            <NFTCard 
              key={nft.id} 
              nft={nft} 
              onClick={setSelectedNFT}
            />
          ))}
        </div>
      </div>
    </div>
  );
}