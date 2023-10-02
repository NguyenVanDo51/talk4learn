import { uniqueId } from 'lodash'
import { ICategory } from './type'
import { Introductionlessons, lessons } from '../lesson'

export const categories: ICategory[] = [
  {
    name: 'Giới thiệu bản thân',
    description: 'Các tình huống sẽ giúp bạn tự tin hơn khi nói giới thiệu về bản thân mình',
    id: uniqueId(),
    lessons: Introductionlessons,
  },
  // {
  //   name: 'Đặt mua vé xem phim',
  //   description: 'Thực hành việc đặt mua vé xem phim qua điện thoại hoặc trực tiếp tại rạp.',
  //   id: uniqueId(),
  //   lessons: [lessons[3], lessons[4], lessons[5]],
  // },
  // {
  //   name: 'Đi mua sắm',
  //   description: 'Học cách mô tả việc mua sắm và tìm kiếm các sản phẩm bạn cần.',
  //   id: uniqueId(),
  //   lessons: [lessons[6], lessons[7], lessons[8]],
  // },
  // {
  //   name: 'Cuộc họp bạn bè',
  //   description: 'Tự tin tham gia cuộc họp bạn bè và thảo luận về các sự kiện xã hội.',
  //   id: uniqueId(),
  //   lessons: [lessons[9], lessons[10], lessons[11]],
  // },
  // {
  //   name: 'Thực hiện cuộc phỏng vấn tình yêu',
  //   description: 'Tham gia cuộc phỏng vấn tình yêu và thể hiện tình cảm của bạn.',
  //   id: uniqueId(),
  //   lessons: [lessons[12], lessons[13], lessons[14]],
  // },
  // {
  //   name: 'Xin việc',
  //   description: 'Học cách viết CV và tham gia cuộc phỏng vấn xin việc.',
  //   id: uniqueId(),
  //   lessons: [lessons[15], lessons[16], lessons[17]],
  // },
  // {
  //   name: 'Lập kế hoạch du lịch',
  //   description: 'Thực hành lập kế hoạch và đặt lịch trình cho cuộc du lịch.',
  //   id: uniqueId(),
  //   lessons: [lessons[18], lessons[19], lessons[20]],
  // },
  // {
  //   name: 'Cuộc thảo luận về môi trường',
  //   description: 'Tham gia cuộc thảo luận về vấn đề môi trường và bảo vệ hành tinh.',
  //   id: uniqueId(),
  //   lessons: [lessons[21], lessons[22], lessons[23]],
  // },
  // {
  //   name: 'Tham gia sự kiện xã hội',
  //   description: 'Tự tin tham gia sự kiện xã hội và gặp gỡ các người mới.',
  //   id: uniqueId(),
  //   lessons: [lessons[24], lessons[25], lessons[26]],
  // },
];
