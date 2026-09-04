export const REGIONAL_ACCOUNTS = [
  {
    id: "super_admin",
    name: "National Master Administrator",
    role: "super_admin",
    email: "admin@annapurna.gov.in",
    username: "admin",
    passkey: "admin2026",
    clearance: "National Level 4 (All Regions Access)",
    scope: "ALL",
    badge: "Super Admin",
    badgeClass: "bg-primary text-on-primary",
    assignedRegion: "All Corridors (Pan-India)",
    description: "Unrestricted national oversight across all regional logistics clusters and corridors."
  },
  {
    id: "mumbai_admin",
    name: "Dr. Ananya Deshmukh",
    role: "regional_admin",
    email: "admin.mumbai@annapurna.gov.in",
    username: "mumbai_admin",
    passkey: "mumbai2026",
    clearance: "Regional Clearance - Konkan & Port Zone",
    scope: "Mumbai Agro Corridor (MH-01)",
    badge: "Mumbai MH-01",
    badgeClass: "bg-secondary-container text-secondary",
    assignedRegion: "Mumbai Agro Corridor (MH-01)",
    description: "Authorized for JNPT port exports, Vashi APMC mega terminal, and coastal cold docks."
  },
  {
    id: "nashik_admin",
    name: "Er. Vivek Patil",
    role: "regional_admin",
    email: "admin.nashik@annapurna.gov.in",
    username: "nashik_admin",
    passkey: "nashik2026",
    clearance: "Regional Clearance - North Maharashtra",
    scope: "Nashik Cluster (MH-15)",
    badge: "Nashik MH-15",
    badgeClass: "bg-primary-container text-primary",
    assignedRegion: "Nashik Cluster (MH-15)",
    description: "Authorized for Lasalgaon onion clearing, Pimpalgaon tomato hubs, and NH-160 transit."
  },
  {
    id: "pune_admin",
    name: "Shri Sachin Shinde",
    role: "regional_admin",
    email: "admin.pune@annapurna.gov.in",
    username: "pune_admin",
    passkey: "pune2026",
    clearance: "Regional Clearance - Western Maharashtra",
    scope: "Pune Hub (MH-12)",
    badge: "Pune MH-12",
    badgeClass: "bg-tertiary-fixed text-tertiary",
    assignedRegion: "Pune Hub (MH-12)",
    description: "Authorized for Hadapsar hub, Baramati grain silos, and agro-processing clusters."
  },
  {
    id: "nagpur_admin",
    name: "Er. Rajeshwari Sharma",
    role: "regional_admin",
    email: "admin.nagpur@annapurna.gov.in",
    username: "nagpur_admin",
    passkey: "nagpur2026",
    clearance: "Regional Clearance - Vidarbha Citrus Belt",
    scope: "Nagpur Central (MH-31)",
    badge: "Nagpur MH-31",
    badgeClass: "bg-outline-variant text-on-surface",
    assignedRegion: "Nagpur Central (MH-31)",
    description: "Authorized for Kalamna mandi, multi-modal rail cargo, and citrus cold pre-cooling lines."
  }
];

export const REGIONS_DATA = {
  "Nashik Cluster (MH-15)": {
    regionName: "Nashik Cluster (MH-15)",
    code: "MH-15",
    state: "Maharashtra (North Cluster)",
    officerTitle: "Er. Vivek Patil (Regional Agritech Controller)",
    officerEmail: "admin.nashik@annapurna.gov.in",
    passkey: "nashik2026",
    color: "primary",
    metrics: {
      activeFarmers: "12,840",
      farmersTrend: "+5.4% this month",
      activeBuyers: "1,284",
      buyersDesc: "Mandi & Retail Coops",
      activeInventory: "825 MT",
      inventorySub: "Across 14 Warehouses",
      warehouseUtilization: "72%",
      utilizationDesc: "Optimal Cold Capacity"
    },
    corridorMap: {
      corridorName: "Nashik - Mumbai Express (NH-160)",
      distance: "166 km",
      avgTransit: "3 hrs 45 mins",
      trackingUnitsSummary: "Tracking 642 active transport units across North Maharashtra agro corridors.",
      activeUnits: 642,
      vehicleReg: "MH-15-TC-7721",
      vehicleSpeed: "58 km/h",
      vehicleCargo: "Hybrid Roma Tomatoes (4.2°C)",
      driver: "Sanjay Gaikwad",
      nodes: [
        { id: 1, name: "Nashik Central Hub", status: "32 Trucks Loading", x: "8%", y: "12%" },
        { id: 2, name: "Kasara Checkpoint", status: "Avg 4.2°C Passed", x: "44%", y: "38%" },
        { id: 3, name: "Mumbai APMC Vashi", status: "Unloading Gate Active", x: "78%", y: "68%" }
      ]
    },
    statusCard: {
      title: "Cluster Network Stable",
      desc: "All 14 regional collection centers and transport hubs operating normally with zero cold chain interruptions.",
      activeFleet: "642 Vehicles",
      systemLatency: "24ms (Optimal)",
      escrowHealth: "100% Fully Collateralized"
    },
    telemetry: {
      ambientTemp: "4.2°C",
      ambientStatus: "Optimal for Tomatoes / Onions",
      humidity: "84%",
      humidityStatus: "Controlled Vapor Guard",
      complianceRate: "99.4%",
      complianceStatus: "FSSAI & GPS Compliant",
      lastSync: "Real-time Telemetry (1s ago)"
    },
    auditStream: [
      { id: "NSK-1", time: "Just now", title: "Optical Sorting Pass", detail: "45 MT Roma Tomatoes cleared Grade A export sorting at Pimpalgaon Node.", badge: "Verified", badgeClass: "bg-primary-container/20 text-primary" },
      { id: "NSK-2", time: "12m ago", title: "Reefer Transit Departure", detail: "MH-15-TC-7721 departed Nashik Cold Terminal towards Vashi APMC.", badge: "In Transit", badgeClass: "bg-secondary-container/40 text-secondary" },
      { id: "NSK-3", time: "34m ago", title: "Smart Escrow Locked", detail: "₹2,85,000 locked by FreshBasket Retail Ltd for Lot #PROD-TOM-01.", badge: "Escrow Locked", badgeClass: "bg-primary-container/30 text-primary" },
      { id: "NSK-4", time: "1h ago", title: "Soil Nitrogen Sensor Test", detail: "FPO Cluster 8842 logged optimal NPK readings (240:38:190).", badge: "Telemetry", badgeClass: "bg-surface-variant text-on-surface-variant" }
    ]
  },

  "Mumbai Agro Corridor (MH-01)": {
    regionName: "Mumbai Agro Corridor (MH-01)",
    code: "MH-01",
    state: "Maharashtra (Metropolitan & Port Corridor)",
    officerTitle: "Dr. Ananya Deshmukh (Metropolitan Logistics Controller)",
    officerEmail: "admin.mumbai@annapurna.gov.in",
    passkey: "mumbai2026",
    color: "secondary",
    metrics: {
      activeFarmers: "4,920",
      farmersTrend: "+3.2% this month",
      activeBuyers: "3,890",
      buyersDesc: "Wholesale APMC & Exporters",
      activeInventory: "1,460 MT",
      inventorySub: "Across 22 Terminal Silos",
      warehouseUtilization: "89%",
      utilizationDesc: "High Intake Utilization"
    },
    corridorMap: {
      corridorName: "Vashi APMC - JNPT Port Agro Expressway (NH-348)",
      distance: "54 km",
      avgTransit: "1 hr 30 mins",
      trackingUnitsSummary: "Tracking 890 heavy commercial and reefer containers in Mumbai Metro & Port zone.",
      activeUnits: 890,
      vehicleReg: "MH-01-RF-4412",
      vehicleSpeed: "42 km/h",
      vehicleCargo: "Nagpur Export Mandarin Oranges (3.8°C)",
      driver: "Gurinder Singh",
      nodes: [
        { id: 1, name: "Navi Mumbai APMC Hub", status: "78 Containers Inbound", x: "10%", y: "14%" },
        { id: 2, name: "Thane Creek Inspection Node", status: "Line 4 Assaying Active", x: "46%", y: "42%" },
        { id: 3, name: "JNPT Reefer Export Dock", status: "Phytosanitary Port Cleared", x: "80%", y: "72%" }
      ]
    },
    statusCard: {
      title: "High-Volume Export Corridor",
      desc: "22 port-adjacent storage silos and cold docks handling intense inbound wholesale trade and export containers.",
      activeFleet: "890 Vehicles",
      systemLatency: "18ms (Fast)",
      escrowHealth: "100% Guaranteed Collateral"
    },
    telemetry: {
      ambientTemp: "3.8°C",
      ambientStatus: "Export Reefer Sub-cooling",
      humidity: "78%",
      humidityStatus: "Coastal Humidity Controlled",
      complianceRate: "99.8%",
      complianceStatus: "Port Authority & FSSAI Cleared",
      lastSync: "Real-time Telemetry (1s ago)"
    },
    auditStream: [
      { id: "BOM-1", time: "Just now", title: "Customs Phyto-Clearance", detail: "Phytosanitary export approval granted for 120 MT Table Potatoes for Gulf shipment.", badge: "Export Cleared", badgeClass: "bg-primary-container/20 text-primary" },
      { id: "BOM-2", time: "8m ago", title: "Heavy Inflow Docked", detail: "18 heavy reefers queued at Gate 3 APMC Vashi for automated weighbridge verification.", badge: "Docked", badgeClass: "bg-secondary-container/40 text-secondary" },
      { id: "BOM-3", time: "25m ago", title: "Escrow Settlement Disbursed", detail: "₹6,40,000 released to Nashik Farmers Collective after digital weight confirmation.", badge: "Disbursed", badgeClass: "bg-primary-container/30 text-primary" },
      { id: "BOM-4", time: "1h ago", title: "Cold Container Seal Verified", detail: "Container APN-CONT-902 sealed with tamper-proof cryptographic BLE lock.", badge: "Sealed", badgeClass: "bg-surface-variant text-on-surface-variant" }
    ]
  },

  "Pune Hub (MH-12)": {
    regionName: "Pune Hub (MH-12)",
    code: "MH-12",
    state: "Maharashtra (Western Agro Processing)",
    officerTitle: "Shri Sachin Shinde (Western Agro Cluster Lead)",
    officerEmail: "admin.pune@annapurna.gov.in",
    passkey: "pune2026",
    color: "tertiary",
    metrics: {
      activeFarmers: "9,640",
      farmersTrend: "+7.1% this month",
      activeBuyers: "1,940",
      buyersDesc: "Food Processors & Retailers",
      activeInventory: "710 MT",
      inventorySub: "Across 16 Grain Silos",
      warehouseUtilization: "65%",
      utilizationDesc: "Balanced Reserve Capacity"
    },
    corridorMap: {
      corridorName: "Pune - Baramati Agro Processing Loop (SH-61)",
      distance: "118 km",
      avgTransit: "2 hrs 40 mins",
      trackingUnitsSummary: "Tracking 512 commercial transit units connecting rural mandis with Pune industrial processors.",
      activeUnits: 512,
      vehicleReg: "MH-12-QB-9104",
      vehicleSpeed: "52 km/h",
      vehicleCargo: "Puneri Cured Red Onions (18.5°C)",
      driver: "Tukaram Jadhav",
      nodes: [
        { id: 1, name: "Hadapsar Aggregation Center", status: "24 Trucks Queued", x: "12%", y: "14%" },
        { id: 2, name: "Shirwal Cold Storage Hub", status: "Sensor Grid Nominal", x: "48%", y: "42%" },
        { id: 3, name: "Baramati Food Processing Park", status: "Silo Intake Active", x: "76%", y: "70%" }
      ]
    },
    statusCard: {
      title: "Agro-Processing Grid Active",
      desc: "Direct arterial transit serving food packaging parks, dairy cold corridors, and modern retail logistics.",
      activeFleet: "512 Vehicles",
      systemLatency: "21ms (Optimal)",
      escrowHealth: "100% Fully Collateralized"
    },
    telemetry: {
      ambientTemp: "18.5°C",
      ambientStatus: "Dry Ventilation Controlled",
      humidity: "64%",
      humidityStatus: "Low Moisture Onion Storage",
      complianceRate: "99.1%",
      complianceStatus: "ISO-22000 Quality Certified",
      lastSync: "Real-time Telemetry (1s ago)"
    },
    auditStream: [
      { id: "PUN-1", time: "Just now", title: "Grain Silo Intake", detail: "85 MT Sharbati Organic Wheat deposited into Baramati Automated Silo #3.", badge: "Intake OK", badgeClass: "bg-primary-container/20 text-primary" },
      { id: "PUN-2", time: "18m ago", title: "Route Optimization Alert", detail: "Transport units dynamically rerouted via SH-61 bypass to avoid expressway toll queue.", badge: "Rerouted", badgeClass: "bg-secondary-container/40 text-secondary" },
      { id: "PUN-3", time: "42m ago", title: "Processing Order Booked", detail: "Haldiram Snacks Logistics placed bulk allocation of 25 MT Jyoti Potatoes.", badge: "Allocated", badgeClass: "bg-primary-container/30 text-primary" },
      { id: "PUN-4", time: "2h ago", title: "Weekly Mandi Clearing Settled", detail: "All 14 village collection centers reported 100% verified digital reconciliation.", badge: "Reconciled", badgeClass: "bg-surface-variant text-on-surface-variant" }
    ]
  },

  "Nagpur Central (MH-31)": {
    regionName: "Nagpur Central (MH-31)",
    code: "MH-31",
    state: "Maharashtra (Vidarbha Multi-Modal Hub)",
    officerTitle: "Er. Rajeshwari Sharma (Vidarbha Logistics Director)",
    officerEmail: "admin.nagpur@annapurna.gov.in",
    passkey: "nagpur2026",
    color: "primary",
    metrics: {
      activeFarmers: "15,320",
      farmersTrend: "+8.6% this month",
      activeBuyers: "1,110",
      buyersDesc: "National Transit & Cold Stores",
      activeInventory: "1,120 MT",
      inventorySub: "Across 18 Cold Chambers",
      warehouseUtilization: "79%",
      utilizationDesc: "Citrus & Cotton Controlled"
    },
    corridorMap: {
      corridorName: "Nagpur - Amravati Citrus Belt (NH-53)",
      distance: "152 km",
      avgTransit: "3 hrs 15 mins",
      trackingUnitsSummary: "Tracking 724 transport units spanning Vidarbha orange orchards, cotton hubs, and rail links.",
      activeUnits: 724,
      vehicleReg: "MH-31-TR-1088",
      vehicleSpeed: "61 km/h",
      vehicleCargo: "Nagpur Mandarin Oranges (4.2°C Controlled)",
      driver: "Ashokrao Kadam",
      nodes: [
        { id: 1, name: "Kalamna Central Mandi", status: "48 Citrus Crates Loading", x: "10%", y: "15%" },
        { id: 2, name: "Katol Pre-Cooling Center", status: "Precision Blast Cooling Active", x: "50%", y: "39%" },
        { id: 3, name: "Wardha Multi-Modal Rail Terminal", status: "CONCOR Cold Wagons Ready", x: "82%", y: "74%" }
      ]
    },
    statusCard: {
      title: "Multi-Modal Rail-Road Hub",
      desc: "Central Indian transit point integrating NH-44 highway fleets with refrigerated freight rail corridors to Delhi & Kolkata.",
      activeFleet: "724 Vehicles",
      systemLatency: "26ms (Stable)",
      escrowHealth: "100% Fully Collateralized"
    },
    telemetry: {
      ambientTemp: "4.2°C",
      ambientStatus: "Citrus Cold Chain Standard",
      humidity: "82%",
      humidityStatus: "High Moisture Retention",
      complianceRate: "98.9%",
      complianceStatus: "National Highway Authority Certified",
      lastSync: "Real-time Telemetry (1s ago)"
    },
    auditStream: [
      { id: "NGP-1", time: "Just now", title: "Mandarin Optical Grading", detail: "60 MT Nagpur Oranges optical blemish test: 98.4% export grade classification.", badge: "Grade A", badgeClass: "bg-primary-container/20 text-primary" },
      { id: "NGP-2", time: "22m ago", title: "Pre-Cooling Protocol Done", detail: "Chamber #2 reached steady 4.2°C core pulp temperature for long-distance transit.", badge: "Pre-cooled", badgeClass: "bg-secondary-container/40 text-secondary" },
      { id: "NGP-3", time: "52m ago", title: "Rail Cold Freight Handover", detail: "200 MT pulses & citrus loaded onto refrigerated container train at Wardha siding.", badge: "Rail Transit", badgeClass: "bg-primary-container/30 text-primary" },
      { id: "NGP-4", time: "2h ago", title: "FPO Group Settlement", detail: "Kalamna Cooperative disbursed ₹5,12,000 for verified orange consignments.", badge: "Disbursed", badgeClass: "bg-surface-variant text-on-surface-variant" }
    ]
  }
};
