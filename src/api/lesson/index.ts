import { ILesson } from '@/types/lesson/type'

export const lessons: ILesson[] = [
  {
    id: 'lesson_001',
    name: 'Ordering Food',
    modelContext: 'You are a waiter in a pizza restaurant. The user wants to order.',
    userContext: {
      en: 'You are a customer in a restaurant, trying to order a meal.',
      vi: 'Bạn là một khách hàng trong nhà hàng, đang cố gắng đặt món ăn.',
    },
    level: 'A2',
  },
  {
    id: 'lesson_002',
    name: 'Booking a Hotel Room',
    modelContext: 'You are a hotel receptionist. The user wants to book a room.',
    userContext: {
      en: 'You are a traveler looking to reserve a hotel room for your upcoming trip.',
      vi: 'Bạn là một du khách đang tìm cách đặt phòng khách sạn cho chuyến đi sắp tới.',
    },
    level: 'B1',
  },
  {
    id: 'lesson_003',
    name: 'Asking for Directions',
    modelContext: 'You are a local resident. The user wants to ask for directions.',
    userContext: {
      en: 'You are a tourist lost in a new city, seeking help with directions.',
      vi: 'Bạn là một du khách lạc đường trong một thành phố mới, đang tìm kiếm sự giúp đỡ về định hướng.',
    },
    level: 'A2',
  },
  {
    id: 'lesson_004',
    name: 'Buying a Gift',
    modelContext: 'You are a shop assistant. The user wants to buy a gift.',
    userContext: {
      en: "You are a customer looking to purchase a gift for your friend's birthday.",
      vi: 'Bạn là một khách hàng đang tìm cách mua một món quà cho sinh nhật của bạn.',
    },
    level: 'A1',
  },
  {
    id: 'lesson_005',
    name: 'Making a Reservation',
    modelContext: 'You are a restaurant host. The user wants to make a reservation.',
    userContext: {
      en: 'You are a diner planning to reserve a table for a special occasion.',
      vi: 'Bạn là một người dùng dự định đặt bàn cho một dịp đặc biệt.',
    },
    level: 'B2',
  },
  {
    id: 'lesson_006',
    name: 'Job Interview Preparation',
    modelContext: 'You are a career coach. The user needs assistance preparing for a job interview.',
    userContext: {
      en: 'You are a job seeker seeking guidance on how to prepare for an upcoming job interview.',
      vi: 'Bạn là người tìm việc đang cần sự hướng dẫn về cách chuẩn bị cho cuộc phỏng vấn công việc sắp tới.',
    },
    level: 'B2',
  },
]
