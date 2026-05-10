import { Destination } from "../types";

export const topDestinations: Destination[] = [
  {
    id: "1",
    name: "Udaipur Lakes & Food",
    country: "India",
    image: "/images/destinations/udaipur-lakes.jpg",
    category: "Lakes & Food",
    aiMatchScore: 94,
    estimatedCost: 8500,
    crowdLevel: "low",
    bestSeason: "October-March",
    badges: ["ai-match", "hidden-gem"],
    description: "The City of Lakes, Udaipur is a vision in white marble. From the serene Lake Pichola to the narrow food lanes of the old city, it offers a perfect blend of royalty and local flavor."
  },
  {
    id: "2",
    name: "Meghalaya Nature Route",
    country: "India",
    image: "/images/destinations/meghalaya-nature.jpg",
    category: "Nature Route",
    aiMatchScore: 89,
    estimatedCost: 12000,
    crowdLevel: "low",
    bestSeason: "October-May",
    badges: ["hidden-gem", "budget-friendly"],
    description: "Home to the cleanest village in Asia and living root bridges, Meghalaya is a mist-covered paradise for nature lovers and slow travelers."
  },
  {
    id: "3",
    name: "Coorg Cafe Trail",
    country: "India",
    image: "/images/destinations/coorg-trail.jpg",
    category: "Cafe Trail",
    aiMatchScore: 87,
    estimatedCost: 9200,
    crowdLevel: "medium",
    bestSeason: "September-March",
    badges: ["budget-friendly", "great-in-season"],
    description: "Known as the Scotland of India, Coorg is famous for its coffee plantations and cozy cafes tucked away in the lush greenery of the Western Ghats."
  },
  {
    id: "4",
    name: "Jaipur Culture Weekend",
    country: "India",
    image: "/images/destinations/jaipur-culture.jpg",
    category: "Culture & Heritage",
    aiMatchScore: 82,
    estimatedCost: 7800,
    crowdLevel: "medium",
    bestSeason: "October-March",
    badges: ["ai-match", "great-in-season"],
    description: "The Pink City is a vibrant mix of history and modern culture. Explore the majestic Amer Fort and the bustling Hawa Mahal bazaar."
  },
  {
    id: "5",
    name: "Rishikesh Adventure",
    country: "India",
    image: "/images/destinations/rishikesh-adventure.jpg",
    category: "Adventure",
    aiMatchScore: 91,
    estimatedCost: 6500,
    crowdLevel: "high",
    bestSeason: "September-November",
    badges: ["budget-friendly"],
    description: "The adventure capital of India. Whether it's white-water rafting on the Ganges or finding peace in an ashram, Rishikesh has it all."
  }
];

export const popularActivities = [
  {
    name: "Paragliding",
    location: "Bir Billing",
    image: "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?w=800&q=80",
    category: "Adventure",
    cost: 3500,
    rating: 4.9
  },
  {
    name: "Scuba Diving",
    location: "Andaman",
    image: "https://images.unsplash.com/photo-1544551763-47a0159c923d?w=800&q=80",
    category: "Adventure",
    cost: 4500,
    rating: 4.8
  },
  {
    name: "Trekking",
    location: "Hampta Pass",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Adventure",
    cost: 8000,
    rating: 4.7
  },
  {
    name: "Wildlife Safari",
    location: "Jim Corbett",
    image: "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=800&q=80",
    category: "Nature",
    cost: 4000,
    rating: 4.6
  },
  {
    name: "Heritage Walk",
    location: "Varanasi",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
    category: "Culture",
    cost: 1500,
    rating: 4.9
  }
];
