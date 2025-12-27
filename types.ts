export interface ItineraryItem {
  month: string;
  dayNum: string;
  date: string;
  title: string;
  content: string; // HTML content string
  icon: string;
  time?: string;
  highlight?: boolean;
  link?: string;
  restaurant?: {
    name: string;
    desc: string;
    link: string;
  };
  mapEmbedUrl?: string;
  location?: string;
  locations?: string[];
}

export interface Accommodation {
  startDay: number;
  endDay: number;
  name: string;
  address: string;
  mapLink: string | null;
}

export interface ShopItem {
  id: string;
  location: 'tromso' | 'abisko' | 'stockholm' | 'rovaniemi';
  category: 'dining' | 'attraction' | 'shopping';
  name: string;
  address?: string;
  description: string;
  googleMapsLink: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

export interface Expense {
  id: number;
  name: string;
  amountForeign: number;
  amountTWD: number;
  date: string;
  image: string | null;
  payer: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

export interface InfoLink {
  title: string;
  url: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  colSpan?: boolean;
}
