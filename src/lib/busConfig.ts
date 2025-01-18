// src/lib/busConfig.ts

export const BUS_API_CONFIG = {
  apiUrl: "http://rt.scmetro.org/bustime/api/v3",
  apiKey: "myjzDyRfTEFfXqidcMfBBjxRc",
  //rtpidatafeed: "YOUR_FEED_NAME", // Optional
  // Force JSON response format
  format: "json"
};

// Individual stop mappings
export const STOP_MAPPINGS = {
  'kresge-1': {
    id: '1509',
    busstopId: '1509',
    name: 'Kresge College'
  },
  'kresge-2': {
    id: '2673',
    busstopId: '2673',
    name: 'Kresge College'
  },
  'science-hill-1': {
    id: '1615',
    busstopId: '1615',
    name: 'Science Hill'
  },
  'science-hill-2': {
    id: '2674',
    busstopId: '2674',
    name: 'Science Hill'
  },
  'college-nine-1': {
    id: '1616',
    busstopId: '1616',
    name: 'College 9 & John R. Lewis'
  },
  'college-nine-2': {
    id: '2675',
    busstopId: '2675',
    name: 'College 9 & John R. Lewis'
  },
  'crown-merrill': {
    id: '1617',
    busstopId: '1617',
    name: 'Crown & Merrill College'
  },
  'bookstore-1': {
    id: '2102',
    busstopId: '2102',
    name: 'Bookstore, Cowell & Stevenson'
  },
  'bookstore-2': {
    id: '2676',
    busstopId: '2676',
    name: 'Bookstore, Cowell & Stevenson'
  },
  'east-field': {
    id: '2101',
    busstopId: '2101',
    name: 'East Field House'
  },
  'east-remote-1': {
    id: '1501',
    busstopId: '1501',
    name: 'East Remote Parking'
  },
  'east-remote-2': {
    id: '2677',
    busstopId: '2677',
    name: 'East Remote Parking'
  },
  'farm-1': {
    id: '2669',
    busstopId: '2669',
    name: 'The Farm'
  },
  'farm-2': {
    id: '2678',
    busstopId: '2678',
    name: 'The Farm'
  },
  'lower-campus-1': {
    id: '1342',
    busstopId: '1342',
    name: 'Lower Campus'
  },
  'main-gate-1': {
    id: '1341',
    busstopId: '1341',
    name: 'Main Gate'
  },
  'main-gate-2': {
    id: '2375',
    busstopId: '2375',
    name: 'Main Gate'
  },
  'high-western-1': {
    id: '1510',
    busstopId: '1510',
    name: 'High & Western'
  },
  'high-western-2': {
    id: '2374',
    busstopId: '2374',
    name: 'High & Western'
  },
  'high-tosca': {
    id: '2739',
    busstopId: '2739',
    name: 'High & Tosca Terrace'
  },
  'arboretum-1': {
    id: '1385',
    busstopId: '1385',
    name: 'Arboretum'
  },
  'arboretum-2': {
    id: '2328',
    busstopId: '2328',
    name: 'Arboretum'
  },
  'oakes-1': {
    id: '1505',
    busstopId: '1505',
    name: 'Oakes College'
  },
  'oakes-2': {
    id: '2670',
    busstopId: '2670',
    name: 'Oakes College'
  },
  'family-housing': {
    id: '2516',
    busstopId: '2516',
    name: 'Family Student Housing'
  },
  'rachel-carson-1': {
    id: '2448',
    busstopId: '2448',
    name: 'Rachel Carson College & Porter'
  },
  'rachel-carson-2': {
    id: '2671',
    busstopId: '2671',
    name: 'Rachel Carson College & Porter'
  },
  'kerr-hall': {
    id: '2672',
    busstopId: '2672',
    name: 'Kerr Hall'
  }
} as const;

// Define stop groupings for stops that should be combined
export const STOP_GROUPINGS = {
  'kresge': {
    id: 'kresge',
    name: 'Kresge College',
    stops: [
      STOP_MAPPINGS['kresge-1'],
      STOP_MAPPINGS['kresge-2']
    ]
  },
  'science-hill': {
    id: 'science-hill',
    name: 'Science Hill',
    stops: [
      STOP_MAPPINGS['science-hill-1'],
      STOP_MAPPINGS['science-hill-2']
    ]
  },
  'college-nine': {
    id: 'college-nine',
    name: 'College 9 & John R. Lewis',
    stops: [
      STOP_MAPPINGS['college-nine-1'],
      STOP_MAPPINGS['college-nine-2']
    ]
  },
  'bookstore': {
    id: 'bookstore',
    name: 'Bookstore, Cowell & Stevenson',
    stops: [
      STOP_MAPPINGS['bookstore-1'],
      STOP_MAPPINGS['bookstore-2']
    ]
  },
  'east-remote': {
    id: 'east-remote',
    name: 'East Remote Parking',
    stops: [
      STOP_MAPPINGS['east-remote-1'],
      STOP_MAPPINGS['east-remote-2']
    ]
  },
  'farm': {
    id: 'farm',
    name: 'The Farm',
    stops: [
      STOP_MAPPINGS['farm-1'],
      STOP_MAPPINGS['farm-2']
    ]
  },
  'main-gate': {
    id: 'main-gate',
    name: 'Main Gate',
    stops: [
      STOP_MAPPINGS['main-gate-1'],
      STOP_MAPPINGS['main-gate-2']
    ]
  },
  'high-western': {
    id: 'high-western',
    name: 'High & Western',
    stops: [
      STOP_MAPPINGS['high-western-1'],
      STOP_MAPPINGS['high-western-2']
    ]
  },
  'arboretum': {
    id: 'arboretum',
    name: 'Arboretum',
    stops: [
      STOP_MAPPINGS['arboretum-1'],
      STOP_MAPPINGS['arboretum-2']
    ]
  },
  'oakes': {
    id: 'oakes',
    name: 'Oakes College',
    stops: [
      STOP_MAPPINGS['oakes-1'],
      STOP_MAPPINGS['oakes-2']
    ]
  },
  'rachel-carson': {
    id: 'rachel-carson',
    name: 'Rachel Carson College & Porter',
    stops: [
      STOP_MAPPINGS['rachel-carson-1'],
      STOP_MAPPINGS['rachel-carson-2']
    ]
  }
} as const;

// Stops that aren't grouped (single direction or standalone stops)
export const SINGLE_STOPS = [
  STOP_MAPPINGS['crown-merrill'],
  STOP_MAPPINGS['kerr-hall'],
  STOP_MAPPINGS['east-field'],
  STOP_MAPPINGS['lower-campus-1'],
  STOP_MAPPINGS['high-tosca'],
  STOP_MAPPINGS['family-housing']
];

// Combined list of grouped and single stops for display
export const DISPLAY_STOPS = [
  STOP_GROUPINGS['science-hill'],
  STOP_GROUPINGS['bookstore'],
  STOP_GROUPINGS['college-nine'],
  STOP_GROUPINGS['kresge'],
  SINGLE_STOPS[0], // crown-merrill
  STOP_GROUPINGS['rachel-carson'],
  STOP_GROUPINGS['east-remote'],
  STOP_GROUPINGS['oakes'],
  SINGLE_STOPS[1], // kerr-hall
  STOP_GROUPINGS['farm'],
  STOP_GROUPINGS['main-gate'],
  STOP_GROUPINGS['high-western'],
  STOP_GROUPINGS['arboretum'],
  ...SINGLE_STOPS.slice(2) // remaining single stops
];


// Route color mappings
export const ROUTE_COLORS: Record<string, string> = {
  '11': 'bg-rose-400',
  '16': 'bg-teal-700',
  '18': 'bg-blue-900',
  '19': 'bg-stone-600',
  '20': 'bg-amber-500',
};

// Route name mappings
export const ROUTE_NAMES: Record<string, string> = {
  '11': 'UCSC Via West Gate - High',
  '16': 'UCSC Via Main Gate - Laurel / Bay',
  '18': 'UCSC Via Main Gate - Mission',
  '19': 'UCSC Via West Gate - Lower Bay',
  '20': 'UCSC Via Main Gate - Delaware / Western',
};