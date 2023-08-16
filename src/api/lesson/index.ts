import { ILesson } from "@/types/lesson/type";

export const lessons: ILesson[] = [
  {
    "id": "lesson_001",
    "name": "Ordering Food",
    "modelContext": "You are a waiter in a restaurant. The user is a customer.",
    "modelRole": "Waiter",
    "userRole": "Customer",
    "userContext": {
      "en": "You are a customer in a restaurant, trying to order a meal.",
      "vi": "Bạn là một khách hàng trong nhà hàng, đang cố gắng đặt món ăn."
    },
    "level": "A2"
  },
  {
    "id": "lesson_002",
    "name": "Asking for Directions",
    "modelContext": "You are a local resident. The user is a tourist looking for directions.",
    "modelRole": "Local Resident",
    "userRole": "Tourist",
    "userContext": {
      "en": "You are a tourist visiting the city and looking for a specific location.",
      "vi": "Bạn là một du khách đang thăm thành phố và đang tìm địa điểm cụ thể."
    },
    "level": "A1"
  },
  {
    "id": "lesson_003",
    "name": "Making a Reservation",
    "modelContext": "You are a hotel receptionist. The user wants to book a room.",
    "modelRole": "Receptionist",
    "userRole": "Customer",
    "userContext": {
      "en": "You are a customer looking to book a room in a hotel for a specific date.",
      "vi": "Bạn là một khách hàng đang muốn đặt phòng khách sạn cho một ngày cụ thể."
    },
    "level": "B1"
  },
  {
    "id": "lesson_004",
    "name": "Buying Tickets",
    "modelContext": "You are a ticket seller at a cinema. The user wants to buy tickets.",
    "modelRole": "Ticket Seller",
    "userRole": "Customer",
    "userContext": {
      "en": "You are a customer planning to watch a movie and need to buy tickets.",
      "vi": "Bạn là một khách hàng dự định xem phim và cần mua vé."
    },
    "level": "B2"
  },
  {
    "id": "lesson_005",
    "name": "Job Interview",
    "modelContext": "You are the interviewer. The user is a job applicant.",
    "modelRole": "Interviewer",
    "userRole": "Job Applicant",
    "userContext": {
      "en": "You are applying for a job and have an interview with the hiring manager.",
      "vi": "Bạn đang nộp đơn xin việc và có buổi phỏng vấn với người quản lý tuyển dụng."
    },
    "level": "B2"
  },
  {
    "id": "lesson_006",
    "name": "Ordering Coffee",
    "modelContext": "You are a barista at a cafe. The user wants to order a coffee.",
    "modelRole": "Barista",
    "userRole": "Customer",
    "userContext": {
      "en": "You are a customer at a cafe and would like to order a cup of coffee.",
      "vi": "Bạn là một khách hàng ở quán cafe và muốn đặt một ly cà phê."
    },
    "level": "A1"
  },
  {
    "id": "lesson_007",
    "name": "Making a Doctor's Appointment",
    "modelContext": "You are a receptionist at a medical clinic. The user wants to schedule a doctor's appointment.",
    "modelRole": "Receptionist",
    "userRole": "Patient",
    "userContext": {
      "en": "You are a patient looking to make an appointment to see a doctor.",
      "vi": "Bạn là một bệnh nhân đang muốn đặt lịch hẹn để thăm bác sĩ."
    },
    "level": "B1"
  },
  {
    "id": "lesson_008",
    "name": "Discussing Travel Plans",
    "modelContext": "You are a travel agent. The user wants to plan a vacation.",
    "modelRole": "Travel Agent",
    "userRole": "Customer",
    "userContext": {
      "en": "You are a customer interested in planning a vacation and seeking assistance from a travel agent.",
      "vi": "Bạn là một khách hàng quan tâm đến việc lập kế hoạch du lịch và đang tìm kiếm sự hỗ trợ từ một đại lý du lịch."
    },
    "level": "B2"
  },
  {
    "id": "lesson_009",
    "name": "Ordering a Pizza",
    "modelContext": "You are a pizza shop employee. The user wants to order a pizza.",
    "modelRole": "Pizza Shop Employee",
    "userRole": "Customer",
    "userContext": {
      "en": "You are a customer craving pizza and want to place an order for delivery.",
      "vi": "Bạn là một khách hàng thèm pizza và muốn đặt một đơn hàng để giao hàng."
    },
    "level": "A2"
  },
  {
    "id": "lesson_010",
    "name": "Talking About Hobbies",
    "modelContext": "You are a language exchange partner. The user wants to talk about their hobbies.",
    "modelRole": "Language Exchange Partner",
    "userRole": "Learner",
    "userContext": {
      "en": "You are learning a new language and would like to discuss your hobbies with a language exchange partner.",
      "vi": "Bạn đang học một ngôn ngữ mới và muốn thảo luận về sở thích của mình với một đối tác trao đổi ngôn ngữ."
    },
    "level": "A1"
  }
]