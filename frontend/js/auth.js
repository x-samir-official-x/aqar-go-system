async function login() {
    // 1. جلب البيانات من الحقول
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMsg = document.getElementById('error');

    // تصفير رسالة الخطأ قبل بدء الفحص
    errorMsg.textContent = "";
    errorMsg.style.color = "#ef4444"; // لون أحمر للأخطاء
    errorMsg.style.fontWeight = "bold";
    errorMsg.style.marginTop = "10px";
    errorMsg.style.textAlign = "center";

    // التحقق من أن الحقول غير فارغة
    if (!emailInput || !passwordInput) {
        errorMsg.textContent = "Please enter both email and password!";
        return;
    }

    try {
        // 2. إرسال الطلب (Request) للسيرفر بتاعنا في الـ Backend
        // غير السطر ده:
const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailInput, password: passwordInput })
});

        const data = await response.json();

        // 3. التحقق من رد السيرفر
        if (response.ok) {
            // تسجيل الدخول نجح
            const userString = JSON.stringify(data.user);

            // تفعيل ميزة "Remember Me"
            if (rememberMe) {
                localStorage.setItem("user", userString);
            } else {
                sessionStorage.setItem("user", userString);
            }

            // توجيه المستخدم للوحة التحكم الخاصة به بناءً على الـ Role
            if (data.user.role === 'owner') {
                window.location.href = "frontend/dashboards/owner-dashboard.html";
            } else {
                window.location.href = "frontend/dashboards/member-dashboard.html";
            }

        } else {
            // الإيميل أو الباسورد غلط (حسب رد السيرفر)
            errorMsg.textContent = data.message || "Invalid email or password!";
        }

    } catch (error) {
        // السيرفر مقفول أو فيه مشكلة في الاتصال
        console.error("Login Connection Error:", error);
        errorMsg.textContent = "Server is offline! Please start the backend server.";
    }
}

// تشغيل الـ Login عند الضغط على زرار Enter في الكيبورد (لتحسين تجربة المستخدم)
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        login();
    }
});