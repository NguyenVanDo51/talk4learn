import { uniqueId } from 'lodash'
import { NextResponse } from 'next/server'

interface TikTokVideo {
  id: string
  uploader: TikTokUser
  videoUrl: string
  description: string
  likes: number
  comments: number
  shares: number
  createdAt: Date
  music: TikTokMusic
}

interface TikTokUser {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  followers: number
  following: number
  bio: string
}

interface TikTokMusic {
  id: string
  title: string
  artist: string
  album: string
  coverUrl: string
}

// Ví dụ cách sử dụng interface TikTokVideo
const tiktokVideos: TikTokVideo[] = [
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'chudung0038',
      displayName: 'TikTok User 1',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 10000,
      following: 500,
      bio: 'Hello TikTok World!',
    },
    videoUrl: 'https://example.com/tiktokvideo1.mp4',
    description: 'Amazing dance moves!',
    likes: 1500,
    comments: 600,
    shares: 300,
    createdAt: new Date('2023-09-26T10:00:00Z'),
    music: {
      id: uniqueId(),
      title: 'Dance Anthem',
      artist: 'TikTok Artist 1',
      album: 'Party Hits',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'tiktokuser20',
      displayName: 'TikTok User 20',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 8000,
      following: 300,
      bio: 'Travel enthusiast ✈️🌍',
    },
    videoUrl: 'https://example.com/tiktokvideo20.mp4',
    description: 'Exploring beautiful landscapes!',
    likes: 1200,
    comments: 400,
    shares: 200,
    createdAt: new Date('2023-09-26T14:30:00Z'),
    music: {
      id: uniqueId(),
      title: 'Adventure Soundtrack',
      artist: 'Travel Vibes',
      album: 'Wanderlust Journeys',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user123',
      displayName: 'User One',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 5000,
      following: 200,
      bio: 'Welcome to my TikTok!',
    },
    videoUrl: 'https://example.com/video1.mp4',
    description: 'Enjoying a sunny day at the beach! 🏖️☀️',
    likes: 1000,
    comments: 200,
    shares: 50,
    createdAt: new Date('2023-09-25'),
    music: {
      id: uniqueId(),
      title: 'Beach Vibes',
      artist: 'Summer Tunes',
      album: 'Sunset Dreams',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user456',
      displayName: 'User Two',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 8000,
      following: 300,
      bio: 'Dancing my heart out! 💃🕺',
    },
    videoUrl: 'https://example.com/video2.mp4',
    description: 'Getting groovy on the dance floor! 💃🎶',
    likes: 2500,
    comments: 400,
    shares: 100,
    createdAt: new Date('2023-09-24'),
    music: {
      id: uniqueId(),
      title: 'Dance Fever',
      artist: 'Party Beats',
      album: 'Nightclub Anthems',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user789',
      displayName: 'User Twenty-One',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 3000,
      following: 150,
      bio: 'Exploring nature and capturing moments! 🌿📸',
    },
    videoUrl: 'https://example.com/video21.mp4',
    description: 'Hiking in the mountains and enjoying the view! ⛰️🌄',
    likes: 700,
    comments: 100,
    shares: 30,
    createdAt: new Date('2023-09-23'),
    music: {
      id: uniqueId(),
      title: 'Mountain Serenade',
      artist: 'Nature Sounds',
      album: 'Wilderness Journeys',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user101',
      displayName: 'User Twenty-Two',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 6000,
      following: 250,
      bio: 'Cooking up delicious recipes in my kitchen! 🍳👩‍🍳',
    },
    videoUrl: 'https://example.com/video22.mp4',
    description: 'Making a mouthwatering chocolate cake! 🍰🍫',
    likes: 1200,
    comments: 300,
    shares: 75,
    createdAt: new Date('2023-09-22'),
    music: {
      id: uniqueId(),
      title: 'Kitchen Melodies',
      artist: 'Chef Beats',
      album: 'Culinary Creations',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user888',
      displayName: 'User Twenty-Three',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 7500,
      following: 400,
      bio: 'Traveling the world and sharing my adventures! 🌍✈️',
    },
    videoUrl: 'https://example.com/video23.mp4',
    description: 'Exploring the ancient ruins of Machu Picchu! 🌄🏛️',
    likes: 1800,
    comments: 500,
    shares: 150,
    createdAt: new Date('2023-09-21'),
    music: {
      id: uniqueId(),
      title: 'Adventure Anthem',
      artist: 'Wanderlust Symphony',
      album: 'Global Expeditions',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user2023',
      displayName: 'User Twenty-Four',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 9000,
      following: 600,
      bio: 'Sharing moments of joy and positivity! 😄🌈',
    },
    videoUrl: 'https://example.com/video24.mp4',
    description: 'Spreading smiles and laughter with funny jokes! 🤣😂',
    likes: 2800,
    comments: 800,
    shares: 200,
    createdAt: new Date('2023-09-20'),
    music: {
      id: uniqueId(),
      title: 'Laughter Therapy',
      artist: 'Comic Relief',
      album: 'Humor Chronicles',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user5050',
      displayName: 'User Twenty-Five',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 3500,
      following: 300,
      bio: 'Artistic creations and visual storytelling! 🎨📷',
    },
    videoUrl: 'https://example.com/video25.mp4',
    description: 'Creating a stunning mural in the heart of the city! 🎨🌆',
    likes: 950,
    comments: 150,
    shares: 40,
    createdAt: new Date('2023-09-19'),
    music: {
      id: uniqueId(),
      title: 'Urban Canvas',
      artist: 'Street Art Groove',
      album: 'City Murals',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user999',
      displayName: 'User Twenty-Six',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 4500,
      following: 350,
      bio: 'Cooking up exotic dishes from around the world! 🌍🍴',
    },
    videoUrl: 'https://example.com/video26.mp4',
    description: 'Preparing a spicy Thai curry for dinner! 🍛🌶️',
    likes: 1500,
    comments: 300,
    shares: 60,
    createdAt: new Date('2023-09-18'),
    music: {
      id: uniqueId(),
      title: 'Global Flavors',
      artist: 'Culinary Beats',
      album: 'International Cuisine',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'userABC',
      displayName: 'User Twenty-Seven',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 7000,
      following: 400,
      bio: 'DIY enthusiast, crafting magic every day! ✂️🎨',
    },
    videoUrl: 'https://example.com/video27.mp4',
    description: 'Building a beautiful wooden bookshelf! 📚✨',
    likes: 2200,
    comments: 500,
    shares: 120,
    createdAt: new Date('2023-09-17'),
    music: {
      id: uniqueId(),
      title: 'Crafting Dreams',
      artist: 'Handmade Harmonies',
      album: 'Artisan Creations',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'userXYZ',
      displayName: 'User Twenty-Eight',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 5500,
      following: 300,
      bio: 'Fitness and wellness for a healthier life! 💪🌱',
    },
    videoUrl: 'https://example.com/video28.mp4',
    description: 'Morning yoga routine to start the day right! 🧘‍♀️🌞',
    likes: 1800,
    comments: 400,
    shares: 90,
    createdAt: new Date('2023-09-16'),
    music: {
      id: uniqueId(),
      title: 'Yoga Harmony',
      artist: 'Mindful Melodies',
      album: 'Wellness Journeys',
      coverUrl: 'https://player.vimeo.com/external/538561465.sd.mp4?s=786eeae0e3c0f89892c3c0ef13d59127799f3182&profile_id=165&oauth2_token_id=57447761',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user777',
      displayName: 'User Twenty-Nine',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 8000,
      following: 600,
      bio: 'Exploring the cosmos one star at a time! 🌌🔭',
    },
    videoUrl: 'https://example.com/video29.mp4',
    description: 'Stargazing and capturing the beauty of the night sky! ✨🌠',
    likes: 2600,
    comments: 700,
    shares: 180,
    createdAt: new Date('2023-09-15'),
    music: {
      id: uniqueId(),
      title: 'Celestial Serenity',
      artist: 'Astro Sounds',
      album: 'Galactic Wonders',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
  {
    id: uniqueId(),
    uploader: {
      id: uniqueId(),
      username: 'user9999',
      displayName: 'User Thirty',
      avatarUrl: 'https://i.pravatar.cc/300',
      followers: 9500,
      following: 700,
      bio: 'Adventures in extreme sports and adrenaline! 🏄‍♂️🏂',
    },
    videoUrl: 'https://example.com/video30.mp4',
    description: 'Surfing the biggest waves in Hawaii! 🌊🏄‍♀️',
    likes: 3200,
    comments: 900,
    shares: 250,
    createdAt: new Date('2023-09-14'),
    music: {
      id: uniqueId(),
      title: 'Extreme Rush',
      artist: 'Adrenaline Beats',
      album: 'Thrill Seekers',
      coverUrl: 'https://vod-progressive.akamaized.net/exp=1695747203~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4437%2F14%2F372185202%2F1546271545.mp4~hmac=21fe4cb440f83b75db2c813a76c521685ac93229d8e63b676db0eae684c68e81/vimeo-prod-skyfire-std-us/01/4437/14/372185202/1546271545.mp4',
    },
  },
]

export const GET = () => {
  return NextResponse.json(tiktokVideos)
}
