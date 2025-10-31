export interface AnalysisResult {
  itemName: string;
  recyclable: 'Yes' | 'No' | 'Uncertain';
  recyclabilityScore: number;
  instructions: string;
  alternatives: string[];
  ecoFriendlyTip: string;
}

export interface HistoryItem {
  id: string;
  image: string; // base64 encoded image with data URI
  result: AnalysisResult;
  timestamp: string;
  points: number;
}

export type AppView = 'welcome' | 'scanner' | 'history' | 'map' | 'profile';
