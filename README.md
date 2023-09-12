## Getting Started

First, run the development server:

```bash
npm i

npm run dev
# or
yarn dev
```

Start prisma studio
```bash
npx prisma studio
```

## Init database
```bash
npx prisma migrate dev
```

## Todo
- dịch anh -> việt, việt -> anh
- Thêm demo ở trang chủ thay vì ảnh gif
- Thêm chụp ảnh màn hình khi feedback
- Chọn giọng nói
- Thêm tính năng phân tích lỗi ngữ pháp
- Chấm điểm writting
- bắt đầu lại cuộc trò chuyện với 1 chủ đề mới
- xây dựng các tình huống

## advice
Ứng dụng **EngSpeakPractice** sẽ tập trung vào việc nâng cao kỹ năng giao tiếp tiếng Anh của người học. Dưới đây là một số tính năng chính mà ứng dụng này có thể bao gồm:

1. **Bài Học Tương Tác**: Bao gồm các tình huống giao tiếp thực tế, từ việc đặt hàng ở nhà hàng đến việc thảo luận về chủ đề phức tạp.

2. **Kết Nối Với Người Bản Xứ**: Tính năng này cho phép người học kết nối trực tiếp với người bản xứ để thực hành giao tiếp.

3. **Phản Hồi Tức Thì**: Sử dụng công nghệ nhận dạng giọng nói để cung cấp phản hồi tức thì về cách phát âm và ngữ điệu.

4. **Mô Phỏng Cuộc Đàm Thoại**: Tạo ra các tình huống đàm thoại ảo giữa máy tính và người học.

5. **Đánh Giá Phát Âm**: Ghi âm giọng của bạn và nhận phản hồi từ chuyên gia về cách cải thiện.

6. **Thử Thách Hàng Ngày**: Mỗi ngày, người học sẽ nhận được một tình huống giao tiếp mới để thử thách kỹ năng của họ.

7. **Chế Độ Role-playing**: Cho phép người học tham gia vào các tình huống giao tiếp như đóng vai trong một kịch bản.

8. **Từ Điển Giao Tiếp**: Một từ điển động với các cụm từ và từ vựng thông dụng trong giao tiếp.

9. **Bài Học Video**: Các bài giảng video từ giáo viên bản xứ về các chủ đề giao tiếp quan trọng.

10. **Hỏi và Đáp**: Một khu vực cho người học đặt câu hỏi và nhận câu trả lời từ cộng đồng hoặc chuyên gia.

11. **Bảng Xếp Hạng & Huy Chương**: Khích lệ người học thông qua hệ thống điểm, bảng xếp hạng và huy chương dựa trên tiến trình và sự tham gia của họ.

12. **Nhóm Thảo Luận**: Tạo ra các nhóm thảo luận nhỏ dựa trên trình độ hoặc sở thích, giúp người học thực hành và tương tác với nhau.

13. **Ghi Âm và Chia Sẻ**: Cho phép người học ghi âm mình và chia sẻ với cộng đồng để nhận xét và góp ý.

14. **Tích Hợp AR/VR**: Sử dụng công nghệ thực tế ảo và tăng cường để đưa người học vào các môi trường giao tiếp thực tế, như một buổi phỏng vấn hoặc một cuộc họp.

15. **Quản Lý Mục Tiêu**: Cho phép người học đặt ra mục tiêu giao tiếp cụ thể và theo dõi tiến trình của họ.

Với những tính năng trên, **EngSpeakPractice** có thể trở thành một công cụ mạnh mẽ giúp người học tiếng Anh nâng cao kỹ năng giao tiếp của mình một cách hiệu quả.

## User stories
User stories là một cách mô tả tính năng dựa trên quan điểm của người dùng, giúp đội ngũ phát triển hiểu rõ hơn về nhu cầu của người dùng. Dưới đây là các user stories cho ứng dụng **EngSpeakPractice**:

1. **Bài Học Tương Tác**
   - Là một người học, tôi muốn thực hành giao tiếp trong các tình huống thực tế để tăng cường kỹ năng giao tiếp của mình.

2. **Kết Nối Với Người Bản Xứ**
   - Là một người học, tôi muốn nói chuyện với một người bản xứ để cải thiện phát âm và ngữ điệu.

3. **Phản Hồi Tức Thì**
   - Là một người học, tôi muốn nhận phản hồi tức thì về cách phát âm của mình để biết cần cải thiện những gì.

4. **Mô Phỏng Cuộc Đàm Thoại**
   - Là một người học, tôi muốn thực hành giao tiếp với một AI thông minh để cải thiện khả năng ngôn ngữ của mình.

5. **Đánh Giá Phát Âm**
   - Là một người học, tôi muốn ghi âm giọng nói của mình và nhận phản hồi từ chuyên gia.

6. **Thử Thách Hàng Ngày**
   - Là một người học, tôi muốn thách thức bản thân mỗi ngày với các bài tập giao tiếp mới để duy trì động lực học.

7. **Chế Độ Role-playing**
   - Là một người học, tôi muốn tham gia vào các tình huống giả định để thực hành kỹ năng giao tiếp.

8. **Từ Điển Giao Tiếp**
   - Là một người học, tôi muốn tra cứu các cụm từ và từ vựng thông dụng trong giao tiếp một cách nhanh chóng.

9. **Bài Học Video**
   - Là một người học, tôi muốn xem các bài giảng video từ giáo viên bản xứ để học hỏi kỹ năng và kiến thức.

10. **Hỏi và Đáp**
   - Là một người học, tôi muốn đặt câu hỏi và nhận câu trả lời từ cộng đồng hoặc chuyên gia.

11. **Bảng Xếp Hạng & Huy Chương**
   - Là một người học, tôi muốn kiểm tra xếp hạng của mình so với người khác để tăng động lực.

12. **Nhóm Thảo Luận**
   - Là một người học, tôi muốn tham gia các nhóm thảo luận để học hỏi và chia sẻ kinh nghiệm.

13. **Ghi Âm và Chia Sẻ**
   - Là một người học, tôi muốn ghi âm cuộc nói chuyện của mình và chia sẻ để nhận xét và góp ý từ cộng đồng.

15. **Quản Lý Mục Tiêu**
   - Là một người học, tôi muốn đặt và theo dõi mục tiêu học tập của mình để đạt được tiến bộ mong muốn.

Những user stories này sẽ giúp đội ngũ phát triển hiểu rõ hơn về nhu cầu của người dùng và xây dựng ứng dụng một cách hiệu quả.