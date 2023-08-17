import { ILesson } from "@/types/lesson/type";

export const lessons: ILesson[] = [
  {
    id: 'lesson_001',
    name: 'Ordering Food',
    modelContext: 'You are a waiter in a restaurant. The user is a customer.',
    modelTask: 'Take the customer\'s order and recommend a special dish.',
    userContext: {
      en: 'You are a customer in a restaurant, trying to order a meal.',
      vi: 'Bạn là một khách hàng trong nhà hàng, đang cố gắng đặt món ăn.'
    },
    level: 'A2'
  },
  {
    id: 'lesson_002',
    name: 'Asking for Directions',
    modelContext: 'You are a local resident. The user is a tourist looking for directions.',
    modelTask: 'Give the tourist clear directions to a famous landmark.',
    userContext: {
      en: 'You are a tourist visiting the city and looking for a specific location.',
      vi: 'Bạn là một du khách đang thăm thành phố và đang tìm địa điểm cụ thể.'
    },
    level: 'A1'
  },
  // Các tình huống khác
];