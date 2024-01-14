### Project web dành admin quản lý ứng dụng thiện nguyện
## 1. Các chức năng
* Đăng nhập, đăng xuất
* Quản lý các thông tin về yêu cầu hỗ trợ, bài đăng hội nhóm, thông tin tổ chức, các tài khoản người dùng
## 2. Công nghệ sử dụng
* ReactJS, NodeJS
* Firebase
## 3. Hướng dẫn cài đặt vào chạy chương trình
* Clone repository:
``` git clone https://github.com/BMHDAC/PTUDDaNenTang_Admin ```
* Tạo file môi trường .env
```
REACT_APP_KEY_AES = "yWkbaF1IaBF2N5VE0A5g8ixM3okcKXfvauVASPmgzP4="
REACT_APP_API_SIGNIN = "http://localhost:8080/api/auth/signin"
REACT_APP_API_REGISTER = "http://localhost:8080/api/auth/register"
```
* Cài đặt thư viện cần thiết
```npm i```
hoặc ```yarn```
* Chạy web admin
```npm start```
hoặc ```yarn start```
