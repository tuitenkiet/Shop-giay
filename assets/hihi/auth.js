const sign = async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra email và username trùng lặp
    const existingUsers = await fetch("http://localhost:5000/api/v1/users");
    const existingUserData = await existingUsers.json();
    const isDuplicate = existingUserData.some(users => users.email === email);

    if (isDuplicate) {
        // Hiển thị thông báo cho người dùng rằng email hoặc username đã tồn tại
        alert("Email hoặc username đã tồn tại. Vui lòng chọn thông tin khác.");
        return;
    } else {
        // Email và username không bị trùng lặp, thêm người dùng mới vào cơ sở dữ liệu
        const data = {
            username,
            email,
            password
        };

        const response = await fetch("http://localhost:5000/api/v1/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            method:'POST',
          body: JSON.stringify({
          fullname:username,
          email:email,
          password:password,
      })
        });
        window.location.href = "account-login.html";
        alert("Đăng ký thành công.");
        
       
    }
   
}


const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log(email,password);
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        }),
      });
  
      if (response.ok) {
        window.location.href = "index-two.html";
        alert("Đăng nhập thành công.");
      } else {
        alert('Sai email hoặc mật khẩu !');
      }
    } catch (err) {
      console.error('Đã xảy ra lỗi:', err);
      alert('Đăng nhập thất bại');
    }
};

  
