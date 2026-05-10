import { Trip } from "../types";

export const mockTrips: Trip[] = [
  {
    id: "1",
    title: "Paris & Rome Adventure",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    destination: "Europe",
    startDate: "2025-05-20",
    endDate: "2025-06-05",
    cities: 4,
    totalBudget: 200000,
    spentAmount: 220000,
    status: "completed",
    budgetStatus: "over",
    itinerary: [
      {
        day: 1,
        date: "2025-05-20",
        activities: [
          {
            id: "a1",
            name: "Colosseum Tour",
            type: "sightseeing",
            time: "09:00 AM",
            cost: 2500,
            notes: "Skip-the-line tour booked",
            image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80"
          },
          {
            id: "a2",
            name: "Lunch at Trattoria",
            type: "food",
            time: "12:30 PM",
            cost: 1500,
            notes: "Authentic Roman pasta"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Kerala Backwaters",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    destination: "Kerala, India",
    startDate: "2025-08-15",
    endDate: "2025-08-22",
    cities: 3,
    totalBudget: 65000,
    spentAmount: 0,
    status: "upcoming",
    budgetStatus: "under",
    itinerary: []
  },
  {
    id: "3",
    title: "Goa Beach Getaway",
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    destination: "Goa, India",
    startDate: "2026-05-10",
    endDate: "2026-05-15",
    cities: 2,
    totalBudget: 45000,
    spentAmount: 28000,
    status: "ongoing",
    budgetStatus: "on-track",
    itinerary: [
      {
        day: 1,
        date: "2026-05-10",
        activities: [
          {
            id: "g1",
            name: "Baga Beach Sunset",
            type: "sightseeing",
            time: "05:30 PM",
            cost: 0,
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80"
          }
        ]
      }
    ]
  }
];
