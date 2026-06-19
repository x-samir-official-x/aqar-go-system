// ==========================================
// 1. إعدادات القائمة الجانبية (Sidebar)
// ==========================================
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
}

// ==========================================
// 2. التحقق من المستخدم الحالي
// ==========================================
const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));

if (!user) {
   window.location.replace("/aqar-go-system/index.html");
}

if (user) {
    console.log(`Logged in as: ${user.name}`);
    const userName = document.getElementById("userName");
    if (userName) {
        userName.innerText = user.name;
    }
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        window.location.replace("/aqar-go-system/index.html");
    });
}

// ==========================================
// 3. جلب البيانات من السيرفر (MongoDB)
// ==========================================
async function loadDashboardData() {
    try {
        // بنجيب كل الداتا في نفس الوقت عشان السرعة
        const [propRes, servRes, memRes] = await Promise.all([
            fetch(`${API_BASE_URL}/properties`),
            fetch(`${API_BASE_URL}/services`),
            fetch(`${API_BASE_URL}/users`)
        ]);

        const properties = await propRes.json();
        const services = await servRes.json();
        const members = await memRes.json();

        // ==========================================
        // أ. حسابات لوحة تحكم المالك (Owner Dashboard)
        // ==========================================
        const totalProperties = document.getElementById("totalProperties");
        if (totalProperties) totalProperties.textContent = properties.length;

        const totalServices = document.getElementById("totalServices");
        if (totalServices) totalServices.textContent = services.length;

        const totalMembers = document.getElementById("totalMembers");
        if (totalMembers) totalMembers.textContent = members.length;

        const pendingReviewsCount = properties.filter(p => p.status === "Pending").length + services.filter(s => s.status === "Pending").length;
        const totalPending = document.getElementById("pendingReviews");
        if (totalPending) totalPending.textContent = pendingReviewsCount;

        const approvedPropertiesElement = document.getElementById("approvedProperties");
        if (approvedPropertiesElement) approvedPropertiesElement.textContent = properties.filter(p => p.status === "Approved").length;

        const rejectedPropertiesElement = document.getElementById("rejectedProperties");
        if (rejectedPropertiesElement) rejectedPropertiesElement.textContent = properties.filter(p => p.status === "Rejected").length;

        const approvedServicesElement = document.getElementById("approvedServices");
        if (approvedServicesElement) approvedServicesElement.textContent = services.filter(s => s.status === "Approved").length;

        const rejectedServicesElement = document.getElementById("rejectedServices");
        if (rejectedServicesElement) rejectedServicesElement.textContent = services.filter(s => s.status === "Rejected").length;

        // قائمة نشاطات المالك (كل النشاطات)
        const activityList = document.getElementById("activityList");
        if (activityList) {
            activityList.innerHTML = "";
            let recentActivities = [
                ...properties.map(p => ({ msg: `🏢 ${p.addedBy} added property: ${p.name}`, date: new Date(p.createdAt) })),
                ...services.map(s => ({ msg: `🛠️ ${s.addedBy} added service: ${s.name}`, date: new Date(s.createdAt) })),
                ...members.map(m => ({ msg: `👤 Member Added: ${m.name}`, date: new Date(m.createdAt) }))
            ];

            // ترتيب من الأحدث للأقدم
            recentActivities.sort((a, b) => b.date - a.date);

            if (recentActivities.length === 0) {
                activityList.innerHTML = `<li>No recent activity</li>`;
            } else {
                recentActivities.slice(0, 5).forEach(activity => {
                    activityList.innerHTML += `<li>${activity.msg}</li>`;
                });
            }
        }

        // ==========================================
        // ب. حسابات لوحة تحكم الموظف (Member Dashboard)
        // ==========================================
        const myProperties = properties.filter(p => p.addedBy === user.name);
        const myServices = services.filter(s => s.addedBy === user.name);

        const totalPropertiesMember = document.getElementById("totalPropertiesMember");
        if (totalPropertiesMember) totalPropertiesMember.textContent = myProperties.length;

        const totalServicesMember = document.getElementById("totalServicesMember");
        if (totalServicesMember) totalServicesMember.textContent = myServices.length;

        const totalRecordsElement = document.getElementById("totalRecords");
        if (totalRecordsElement) totalRecordsElement.textContent = myProperties.length + myServices.length;

        // حساب إحصائيات "اليوم"
        const today = new Date().toDateString();
        const todayProperties = myProperties.filter(p => new Date(p.createdAt).toDateString() === today);
        const todayServices = myServices.filter(s => new Date(s.createdAt).toDateString() === today);

        const todayRecords = document.getElementById("todayRecords");
        if (todayRecords) todayRecords.textContent = todayProperties.length + todayServices.length;

        // قائمة نشاطات الموظف (نشاطاته هو بس)
        const memberActivityList = document.getElementById("memberActivityList");
        if (memberActivityList) {
            memberActivityList.innerHTML = "";
            let memberActivities = [
                ...myProperties.map(p => ({ msg: `🏢 Added Property: ${p.name}`, date: new Date(p.createdAt) })),
                ...myServices.map(s => ({ msg: `🛠️ Added Service: ${s.name}`, date: new Date(s.createdAt) }))
            ];

            // ترتيب من الأحدث للأقدم
            memberActivities.sort((a, b) => b.date - a.date);

            if (memberActivities.length === 0) {
                memberActivityList.innerHTML = "<li>No activity yet</li>";
            } else {
                memberActivities.slice(0, 5).forEach(activity => {
                    memberActivityList.innerHTML += `<li>${activity.msg}</li>`;
                });
            }
        }

    } catch (error) {
        console.error("Dashboard Fetch Error:", error);
    }
}

// تشغيل الدالة
loadDashboardData();