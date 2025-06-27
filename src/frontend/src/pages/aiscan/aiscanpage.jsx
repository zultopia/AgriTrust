import React, { useState } from 'react';
import { 
  Upload,
  Camera,
  Activity,
  Award,
  Leaf,
  CheckCircle,
  Info,
  FileImage,
  Download
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/components/ui/select';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';

const scanResults = {
  cropType: "Padi",
  visualQuality: 87,
  grade: "A",
  detectedIssues: "None",
  recommendations: [
    "Crop shows excellent growth patterns",
    "Maintain current fertilization schedule",
    "Continue monitoring for optimal harvest timing",
    "Consider implementing precision irrigation"
  ],
  analysis: {
    healthScore: 92,
    maturityLevel: 78,
    diseaseRisk: "Low",
    harvestReadiness: "2-3 weeks",
    estimatedYield: "6.5 tons/hectare"
  },
  nftReward: {
    type: "Growth Excellence",
    points: 850,
    rarity: "Rare",
    description: "Awarded for maintaining superior crop quality"
  }
};

const cropTypes = [
  "Padi", "Jagung", "Kedelai", "Cabai", "Tomat", "Kentang", "Singkong", "Ubi Jalar"
];

const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Crop Quality Analysis Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Crop Info
  autoTable(doc, {
    startY: 40,
    head: [["Field", "Value"]],
    body: [
      ["Crop Type", scanResults.cropType],
      ["Visual Quality", `${scanResults.visualQuality}%`],
      ["Grade", scanResults.grade],
      ["Detected Issues", scanResults.detectedIssues],
    ],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Analysis", "Value"]],
    body: [
      ["Health Score", `${scanResults.analysis.healthScore}%`],
      ["Maturity Level", `${scanResults.analysis.maturityLevel}%`],
      ["Disease Risk", scanResults.analysis.diseaseRisk],
      ["Harvest Readiness", scanResults.analysis.harvestReadiness],
      ["Estimated Yield", scanResults.analysis.estimatedYield],
    ],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["NFT Reward Info", "Value"]],
    body: [
      ["Type", scanResults.nftReward.type],
      ["Points", `${scanResults.nftReward.points} LUM`],
      ["Rarity", scanResults.nftReward.rarity],
      ["Description", scanResults.nftReward.description],
    ],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["AI Recommendations"]],
    body: scanResults.recommendations.map((rec) => [rec]),
  });

  doc.save("Crop-Analysis-Report.pdf");
};


const AIScanPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedCropType, setSelectedCropType] = useState("");
  const [estimatedQuality, setEstimatedQuality] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!uploadedImage || !selectedCropType || !estimatedQuality) return;

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 3000);
  };

  const resetScan = () => {
    setUploadedImage(null);
    setSelectedCropType("");
    setEstimatedQuality("");
    setShowResults(false);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 pt-28">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Upload your crop photo and let our AI grade it instantly
          </h1>
          <p className="text-emerald-100 text-lg">
            Advanced AI technology for precise crop analysis and quality assessment
          </p>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
            <div className="mb-6">
              <Label className="text-lg font-semibold text-white mb-4 block">
                Upload Crop Image
              </Label>
              {!uploadedImage ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-white font-medium mb-2">Upload Image</p>
                    <p className="text-gray-400 text-sm">Drag and drop or click to select</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img src={uploadedImage} alt="Uploaded crop" className="w-full h-64 object-cover rounded-lg" />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">
                  Crop Type <span className="text-red-400">*</span>
                </Label>
                <Select value={selectedCropType} onValueChange={setSelectedCropType}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop} value={crop} className="text-white hover:bg-gray-600">
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">
                  Estimated Quality (kg) <span className="text-red-400">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="Enter estimated quality in kg"
                  value={estimatedQuality}
                  onChange={(e) => setEstimatedQuality(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Planting Date</Label>
                <Input
                  type="date"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleScan}
                disabled={!uploadedImage || !selectedCropType || !estimatedQuality || isScanning}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-medium"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Crop...
                  </>
                ) : (
                  <>
                    <Camera className="h-5 w-5 mr-2" />
                    CHECK YOUR CROP
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right - Results */}
        <div className="space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="h-6 w-6 text-emerald-400" /> RESULT
            </h2>

            {!showResults && !isScanning ? (
              <div className="text-center py-12">
                <FileImage className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400 text-lg">
                  Upload image and fill form to get AI analysis
                </p>
              </div>
            ) : isScanning ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-white font-medium text-lg mb-2">Analyzing your crop...</p>
                <p className="text-gray-400">This may take a few moments</p>
              </div>
            ) : (
              <div id="report-section" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Crop Type</p>
                    <p className="text-white font-bold text-lg">{scanResults.cropType}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Visual Quality</p>
                    <p className="text-emerald-400 font-bold text-lg">
                      {scanResults.visualQuality}% (Grade {scanResults.grade})
                    </p>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Detected Issues</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <p className="text-emerald-400 font-medium">{scanResults.detectedIssues}</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-400" />
                    Detailed Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-gray-400">Health Score</p><p className="text-white">{scanResults.analysis.healthScore}%</p></div>
                    <div><p className="text-gray-400">Maturity Level</p><p className="text-white">{scanResults.analysis.maturityLevel}%</p></div>
                    <div><p className="text-gray-400">Disease Risk</p><p className="text-emerald-400">{scanResults.analysis.diseaseRisk}</p></div>
                    <div><p className="text-gray-400">Harvest Ready</p><p className="text-white">{scanResults.analysis.harvestReadiness}</p></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-4">
                  <h3 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    NFT Reward Earned!
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-gray-300">Type</p><p className="text-white">{scanResults.nftReward.type}</p></div>
                    <div><p className="text-gray-300">Points</p><p className="text-yellow-400">{scanResults.nftReward.points} LUM</p></div>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-emerald-400" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {scanResults.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                        <span className="text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button onClick={resetScan} variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-700">
                    Scan New Crop
                  </Button>
                  <Button onClick={downloadPDF} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

    </div>
  );
};

export default AIScanPage;
