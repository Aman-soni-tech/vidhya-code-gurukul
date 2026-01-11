// ================= LOGIN FUNCTION =================
function login(event){
  event.preventDefault();
  
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let remember = document.getElementById("remember").checked;

  if(!email || !password){
    alert("❌ Please fill all fields");
    return;
  }

  // Check if email format is valid
  if(!isValidEmail(email)){
    alert("❌ Please enter a valid email address");
    return;
  }

  // Check for admin credentials
  const ADMIN_EMAIL = "admin@vidhyacode.com";
  const ADMIN_PASSWORD = "admin@123";

  if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
    // Admin login
    localStorage.setItem("currentUser", JSON.stringify({
      fullname: "Admin",
      email: email,
      phone: "+91 62329 83739",
      isAdmin: true
    }));
    
    if(remember){
      localStorage.setItem("rememberMe", "true");
    }
    
    alert("✅ Admin Login Successful!");
    window.location.href = "dashboard.html";
    return;
  }

  // Get registered users from localStorage
  let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  
  // Check if user exists
  let user = registeredUsers.find(u => u.email === email && u.password === password);
  
  if(user){
    // Store current logged-in user
    localStorage.setItem("currentUser", JSON.stringify({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      isAdmin: false
    }));
    
    if(remember){
      localStorage.setItem("rememberMe", "true");
    }
    
    alert("✅ Login Successful! Welcome " + user.fullname);
    window.location.href = "dashboard.html";
  }else{
    alert("❌ Invalid email or password. Please try again or register.");
  }
}

// ================= REGISTRATION FUNCTION =================
function registerUser(event){
  event.preventDefault();
  
  let fullname = document.getElementById("fullname").value.trim();
  let email = document.getElementById("reg-email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("reg-password").value.trim();
  let confirmPassword = document.getElementById("confirm-password").value.trim();
  let terms = document.getElementById("terms").checked;

  // Validation checks
  if(!fullname || !email || !phone || !password || !confirmPassword){
    alert("❌ Please fill all fields");
    return;
  }

  if(!isValidEmail(email)){
    alert("❌ Please enter a valid email address");
    return;
  }

  if(password.length < 6){
    alert("❌ Password must be at least 6 characters long");
    return;
  }

  if(password !== confirmPassword){
    alert("❌ Passwords do not match");
    return;
  }

  if(!terms){
    alert("❌ Please agree to the Terms & Conditions");
    return;
  }

  // Get existing users
  let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  
  // Check if email already exists
  if(registeredUsers.find(u => u.email === email)){
    alert("❌ This email is already registered. Please login or use a different email.");
    return;
  }

  // Create new user object
  let newUser = {
    fullname: fullname,
    email: email,
    phone: phone,
    password: password,
    registeredDate: new Date().toLocaleDateString()
  };

  // Add user to array and save to localStorage
  registeredUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

  alert("✅ Registration Successful! Your account has been created.\n\nPlease login with your email and password.");
  window.location.href = "index.html";
}

// ================= EMAIL VALIDATION =================
function isValidEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ================= LOGOUT FUNCTION =================
function logout(){
  localStorage.removeItem("currentUser");
  localStorage.removeItem("rememberMe");
  alert("✅ Logged out successfully!");
  window.location.href = "index.html";
}

// ================= PROMOTIONS PAGE FUNCTIONS =================

// Handle banner upload
function handleBannerUpload(event){
  const file = event.target.files[0];
  
  if(!file){
    return;
  }

  // Validate file size (5MB max)
  if(file.size > 5 * 1024 * 1024){
    alert("❌ File size should be less than 5MB");
    return;
  }

  // Validate file type
  if(!file.type.startsWith("image/")){
    alert("❌ Please upload an image file");
    return;
  }

  // Read file and convert to base64
  const reader = new FileReader();
  reader.onload = function(e){
    let banners = JSON.parse(localStorage.getItem("promobanners")) || [];
    
    // Add new banner
    banners.push({
      id: Date.now(),
      imageData: e.target.result
    });

    localStorage.setItem("promobanners", JSON.stringify(banners));
    alert("✅ Banner uploaded successfully!");
    
    // Reset input and refresh gallery
    event.target.value = "";
    displayBanners();
  };

  reader.readAsDataURL(file);
}

// Display banners
function displayBanners(){
  const bannersGallery = document.getElementById("bannersGallery");
  let banners = JSON.parse(localStorage.getItem("promobanners")) || [];

  if(banners.length === 0){
    // Keep the existing static banners, don't clear them
    return;
  }

  // Get the existing static banners HTML
  let existingHTML = bannersGallery.innerHTML;
  
  let html = existingHTML;
  banners.forEach(banner => {
    html += `
      <div class="banner-item">
        <img src="${banner.imageData}" alt="Promotional Banner">
        <button class="banner-delete" onclick="deleteBanner(${banner.id})">Delete</button>
      </div>
    `;
  });

  bannersGallery.innerHTML = html;
}

// Delete banner
function deleteBanner(bannerId){
  if(confirm("Are you sure you want to delete this banner?")){
    let banners = JSON.parse(localStorage.getItem("promobanners")) || [];
    banners = banners.filter(b => b.id !== bannerId);
    localStorage.setItem("promobanners", JSON.stringify(banners));
    displayBanners();
    alert("✅ Banner deleted successfully!");
  }
}

// Add promotion
function addPromotion(){
  let title = document.getElementById("promoTitle").value.trim();
  let desc = document.getElementById("promoDesc").value.trim();
  let discount = document.getElementById("promoDiscount").value.trim();
  let course = document.getElementById("promoCourse").value.trim();
  let expiry = document.getElementById("promoExpiry").value.trim();

  if(!title || !desc || !discount || !course || !expiry){
    alert("❌ Please fill all fields");
    return;
  }

  let promotions = JSON.parse(localStorage.getItem("promotions")) || [];

  let newPromo = {
    id: Date.now(),
    title: title,
    description: desc,
    discount: discount,
    course: course,
    expiry: expiry,
    createdDate: new Date().toLocaleDateString()
  };

  promotions.push(newPromo);
  localStorage.setItem("promotions", JSON.stringify(promotions));

  alert("✅ Promotion added successfully!");

  // Clear form
  document.getElementById("promoTitle").value = "";
  document.getElementById("promoDesc").value = "";
  document.getElementById("promoDiscount").value = "";
  document.getElementById("promoCourse").value = "";
  document.getElementById("promoExpiry").value = "";

  displayPromotions();
}

// Display promotions
function displayPromotions(){
  const promosList = document.getElementById("promosList");
  let promotions = JSON.parse(localStorage.getItem("promotions")) || [];

  if(promotions.length === 0){
    promosList.innerHTML = '<div class="empty-state"><p>🎯 No promotions added yet. Create your first promotion!</p></div>';
    return;
  }

  let html = "";
  promotions.forEach(promo => {
    html += `
      <div class="promo-card">
        <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:12px;">
          <div>
            <h4>${promo.title}</h4>
            <p>${promo.description}</p>
          </div>
          <div class="promo-discount">${promo.discount}% OFF</div>
        </div>
        <p><strong>Course:</strong> ${promo.course}</p>
        <p><strong>Valid till:</strong> ${promo.expiry}</p>
        <button class="promo-delete" onclick="deletePromotion(${promo.id})">Delete Promotion</button>
      </div>
    `;
  });

  promosList.innerHTML = html;
}

// Delete promotion
function deletePromotion(promoId){
  if(confirm("Are you sure you want to delete this promotion?")){
    let promotions = JSON.parse(localStorage.getItem("promotions")) || [];
    promotions = promotions.filter(p => p.id !== promoId);
    localStorage.setItem("promotions", JSON.stringify(promotions));
    displayPromotions();
    alert("✅ Promotion deleted successfully!");
  }
}

// Initialize promotions page on load
window.addEventListener("load", function(){
  if(document.getElementById("bannersGallery")){
    displayBanners();
    displayPromotions();
  }
  if(document.getElementById("resultsContainer")){
    initializeResultsPage();
  }
});

// ================= RESULTS PAGE FUNCTIONS =================

// Add student result
function addStudentResult(){
  let name = document.getElementById("studentName").value.trim();
  let roll = document.getElementById("rollNumber").value.trim();
  let email = document.getElementById("studentEmail").value.trim();
  let course = document.getElementById("courseSelect").value.trim();
  let batch = document.getElementById("batchSelect").value.trim();
  let marks = parseFloat(document.getElementById("marksObtained").value.trim());
  let total = parseFloat(document.getElementById("totalMarks").value.trim());
  let date = document.getElementById("resultDate").value.trim();
  let remarks = document.getElementById("remarks").value.trim();

  if(!name || !roll || !email || !course || !batch || !marks || !total || !date){
    alert("❌ Please fill all required fields");
    return;
  }

  if(marks > total){
    alert("❌ Marks obtained cannot be greater than total marks");
    return;
  }

  let results = JSON.parse(localStorage.getItem("studentResults")) || [];

  let newResult = {
    id: Date.now(),
    name: name,
    rollNumber: roll,
    email: email,
    course: course,
    batch: batch,
    marksObtained: marks,
    totalMarks: total,
    percentage: ((marks / total) * 100).toFixed(2),
    date: date,
    remarks: remarks,
    addedDate: new Date().toLocaleDateString()
  };

  results.push(newResult);
  localStorage.setItem("studentResults", JSON.stringify(results));

  alert("✅ Result added successfully!");

  // Clear form
  document.getElementById("studentName").value = "";
  document.getElementById("rollNumber").value = "";
  document.getElementById("studentEmail").value = "";
  document.getElementById("courseSelect").value = "";
  document.getElementById("batchSelect").value = "";
  document.getElementById("marksObtained").value = "";
  document.getElementById("totalMarks").value = "100";
  document.getElementById("resultDate").value = "";
  document.getElementById("remarks").value = "";

  displayResults();
  updateStatistics();
}

// Display results
function displayResults(){
  const resultsContainer = document.getElementById("resultsContainer");
  let results = JSON.parse(localStorage.getItem("studentResults")) || [];

  // Apply filters
  let filteredResults = results;
  
  let searchTerm = document.getElementById("searchStudent").value.toLowerCase();
  let courseFilter = document.getElementById("filterCourse").value;
  let batchFilter = document.getElementById("filterBatch").value;

  if(searchTerm){
    filteredResults = filteredResults.filter(r => 
      r.name.toLowerCase().includes(searchTerm) || 
      r.rollNumber.toLowerCase().includes(searchTerm)
    );
  }

  if(courseFilter){
    filteredResults = filteredResults.filter(r => r.course === courseFilter);
  }

  if(batchFilter){
    filteredResults = filteredResults.filter(r => r.batch === batchFilter);
  }

  if(filteredResults.length === 0){
    resultsContainer.innerHTML = '<div class="empty-state"><p>📝 No results found. Try different filters or add a new result!</p></div>';
    return;
  }

  let html = "";
  filteredResults.reverse().forEach(result => {
    let statusClass = result.percentage >= 70 ? "pass" : "fail";
    let statusText = result.percentage >= 70 ? "PASS ✓" : "FAIL ✗";
    
    html += `
      <div class="result-card">
        <div class="result-header">
          <div class="result-name">${result.name}</div>
          <div class="result-roll">${result.rollNumber}</div>
        </div>
        
        <div class="result-meta">
          <div class="result-meta-item">
            <strong>Course</strong>
            ${result.course}
          </div>
          <div class="result-meta-item">
            <strong>Batch</strong>
            ${result.batch}
          </div>
          <div class="result-meta-item">
            <strong>Email</strong>
            <span style="font-size:11px;">${result.email}</span>
          </div>
          <div class="result-meta-item">
            <strong>Exam Date</strong>
            ${result.date}
          </div>
        </div>

        <div class="result-score">
          <div class="score-display">
            <p>Score</p>
            <div class="score-percentage">${result.percentage}%</div>
            <p style="font-size:12px; color:#64748b; margin-top:4px;">${result.marksObtained}/${result.totalMarks} marks</p>
          </div>
          <div class="score-status ${statusClass}">${statusText}</div>
        </div>

        ${result.remarks ? `<div class="result-remarks">📝 ${result.remarks}</div>` : ''}
        
        <div class="result-date">Added on: ${result.addedDate}</div>
        
        <button class="result-delete-btn" onclick="deleteResult(${result.id})">Delete Result</button>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;
}

// Filter results
function filterResults(){
  displayResults();
}

// Delete result
function deleteResult(resultId){
  if(confirm("Are you sure you want to delete this result?")){
    let results = JSON.parse(localStorage.getItem("studentResults")) || [];
    results = results.filter(r => r.id !== resultId);
    localStorage.setItem("studentResults", JSON.stringify(results));
    displayResults();
    updateStatistics();
    alert("✅ Result deleted successfully!");
  }
}

// Update statistics
function updateStatistics(){
  let results = JSON.parse(localStorage.getItem("studentResults")) || [];

  if(results.length === 0){
    document.getElementById("totalStudents").textContent = "0";
    document.getElementById("averageScore").textContent = "0%";
    document.getElementById("passRate").textContent = "0%";
    document.getElementById("highestScore").textContent = "0%";
    return;
  }

  let totalScore = 0;
  let passCount = 0;
  let highestScore = 0;

  results.forEach(result => {
    let percentage = parseFloat(result.percentage);
    totalScore += percentage;
    if(percentage >= 70) passCount++;
    if(percentage > highestScore) highestScore = percentage;
  });

  let averageScore = (totalScore / results.length).toFixed(2);
  let passRate = ((passCount / results.length) * 100).toFixed(2);

  document.getElementById("totalStudents").textContent = results.length;
  document.getElementById("averageScore").textContent = averageScore + "%";
  document.getElementById("passRate").textContent = passRate + "%";
  document.getElementById("highestScore").textContent = highestScore.toFixed(2) + "%";
}

// ================= ADMIN CHECK FUNCTIONS =================

// Check if current user is admin
function isCurrentUserAdmin(){
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  return currentUser.isAdmin === true;
}

// Initialize results page with admin/user role
function initializeResultsPage(){
  let isAdmin = isCurrentUserAdmin();
  
  // Hide/Show admin sections
  let formSection = document.querySelector(".results-form-section");
  let searchSection = document.querySelector(".results-search-section");
  
  if(formSection){
    formSection.style.display = isAdmin ? "block" : "none";
  }
  
  if(searchSection && !isAdmin){
    searchSection.style.display = "none";
  }

  // Add admin indicator if user is admin
  if(isAdmin){
    let adminBadge = document.createElement("div");
    adminBadge.className = "admin-badge";
    adminBadge.innerHTML = "👨‍💼 ADMIN MODE";
    document.body.insertBefore(adminBadge, document.body.firstChild);
  }

  displayResults();
  updateStatistics();
}
