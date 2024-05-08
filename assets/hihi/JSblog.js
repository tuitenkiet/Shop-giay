const urlblog = "http://localhost:3000/blog";
fetch(urlblog)
  .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js  
  .then((data) => {
    const listblog = document.querySelector("#show-blog");
    let listbloghtml = ''; // Khởi tạo một chuỗi rỗng để tích luỹ HTML

    data.forEach((item) => {
      listbloghtml += `
        <div class="col-md-6 col-lg-4">
        <!--== Start Blog Item ==-->
        <div class="post-item">
          <div class="inner-content">
            <div class="thumb">
              <a href="blog-details-no-sidebar.html"><img src="${item.img}" width="370" height="260" alt="Image-HasTech"></a>
            </div>
            <div class="content">
              <div class="meta-post">
                <ul>
                  <li class="post-date"><i class="fa fa-calendar"></i><a href="blog.html">${item.start_day}</a></li>
                  <li class="author-info"><i class="fa fa-user"></i><a href="blog.html">${item.author}</a></li>
                </ul>
              </div>
              <h4 class="title"><a href="blog-details-no-sidebar.html">${item.title}</a></h4>
              <a class="post-btn" href="blog-details-no-sidebar.html">${item.read}</a>
            </div>
          </div>
        </div>
        <!--== End Blog Item ==-->
      </div>
        `;
        // console.log(listbloghtml)
    });

    // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
    listblog.innerHTML = listbloghtml;

  })
  .catch((error) => {
    console.error("Lỗi", error);
  });

  