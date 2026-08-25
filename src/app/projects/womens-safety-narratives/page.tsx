import type { Metadata } from 'next';
import WomensSafetyNarrativesDashboard from './womens-safety-narratives-dashboard';

const title = "Women's Safety Narratives | Yogesh Kuchimanchi";
const description = 'Aggregate dashboard for public discourse across 16 women-safety cases in India.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
};

export default function WomensSafetyNarrativesPage() {
  return <WomensSafetyNarrativesDashboard />;
}
