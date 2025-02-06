// ฟังก์ชันคำนวณความเสี่ยง
function calculateRisk() {
    let age = parseInt(document.getElementById("age").value);
    let bmi = parseFloat(document.getElementById("bmi").value);
    let bloodSugar = parseFloat(document.getElementById("blood_sugar").value);
    let familyHistory = document.getElementById("family_history").value === "yes";
    let physicalActivity = document.getElementById("physical_activity").value === "yes";

    if (isNaN(age) || isNaN(bmi) || isNaN(bloodSugar)) {
        document.getElementById("result").innerHTML = "<span style='color: red;'>กรุณากรอกข้อมูลให้ครบถ้วน</span>";
        return;
    }

    let riskScore = 0;

    // เพิ่มคะแนนตามข้อมูลที่กรอก
    if (age > 45) {
        riskScore += 2;
    } else if (age > 30) {
        riskScore += 1;
    }

    if (bmi >= 30) {
        riskScore += 2;
    } else if (bmi >= 25) {
        riskScore += 1;
    }

    if (bloodSugar >= 126) {
        riskScore += 3;
    } else if (bloodSugar >= 100) {
        riskScore += 1;
    }

    if (familyHistory) {
        riskScore += 2;
    }

    if (!physicalActivity) {
        riskScore += 1;
    }

    // แสดงผลการประเมินตามคะแนนความเสี่ยง
    let resultText = "";
    if (riskScore >= 6) {
        resultText = "<span style='color: red;'>ความเสี่ยงสูง! ควรพบแพทย์เพื่อรับการตรวจเพิ่มเติม</span>";
    } else if (riskScore >= 3) {
        resultText = "<span style='color: orange;'>ความเสี่ยงปานกลาง ควรปรับพฤติกรรมการใช้ชีวิต</span>";
    } else {
        resultText = "<span style='color: green;'>ความเสี่ยงต่ำ แต่ควรรักษาสุขภาพให้ดี</span>";
    }

    document.getElementById("result").innerHTML = resultText;
}

function saveSettings() {
    // Get the selected values from the form
    const language = document.getElementById("language").value;
    const theme = document.getElementById("theme").value;
    const unit = document.getElementById("unit").value;

    // Save the settings to localStorage
    localStorage.setItem("language", language);
    localStorage.setItem("theme", theme);
    localStorage.setItem("unit", unit);

    // Provide feedback to the user
    alert("การตั้งค่าถูกบันทึกเรียบร้อย!");
}

// เมื่อโหลดหน้าเว็บให้ตั้งค่าจาก localStorage
window.onload = function() {
    const language = localStorage.getItem("language") || "th";
    const theme = localStorage.getItem("theme") || "light";
    const unit = localStorage.getItem("unit") || "kg";

    // ตั้งค่า default ที่เลือกจาก localStorage
    document.getElementById("language").value = language;
    document.getElementById("theme").value = theme;
    document.getElementById("unit").value = unit;

    // ปรับโหมดและภาษาเมื่อโหลดหน้า
    setLanguage(language);
    setTheme(theme);
    setUnit(unit);
};

// ฟังก์ชันบันทึกข้อมูลการตั้งค่า
function saveSettings() {
    const language = document.getElementById("language").value;
    const theme = document.getElementById("theme").value;
    const unit = document.getElementById("unit").value;

    // บันทึกค่าที่เลือกลงใน localStorage
    localStorage.setItem("language", language);
    localStorage.setItem("theme", theme);
    localStorage.setItem("unit", unit);

    // เรียกฟังก์ชันเพื่อปรับภาษา, โหมด และหน่วย
    setLanguage(language);
    setTheme(theme);
    setUnit(unit);

    // แจ้งเตือนผู้ใช้
    alert("การตั้งค่าถูกบันทึกเรียบร้อย!");
}

// ฟังก์ชันปรับภาษา
function setLanguage(language) {
    if (language === "en") {
        document.querySelector("h2").textContent = "User Settings";
        document.querySelector("label[for='language']").textContent = "Choose Language:";
        document.querySelector("label[for='theme']").textContent = "Choose Theme:";
        document.querySelector("label[for='unit']").textContent = "Choose Unit:";
        document.querySelector("button").textContent = "Save Settings";
    } else {
        document.querySelector("h2").textContent = "⚙️ ตั้งค่าผู้ใช้งาน";
        document.querySelector("label[for='language']").textContent = "เลือกภาษา:";
        document.querySelector("label[for='theme']").textContent = "เลือกโหมด:";
        document.querySelector("label[for='unit']").textContent = "เลือกหน่วย:";
        document.querySelector("button").textContent = "บันทึกข้อมูล";
    }
}

// ฟังก์ชันปรับโหมด
function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// ฟังก์ชันปรับหน่วย
function setUnit(unit) {
    if (unit === "lb") {
        alert("คุณเลือกหน่วยเป็นปอนด์/นิ้ว");
    } else {
        alert("คุณเลือกหน่วยเป็นกิโลกรัม/เซนติเมตร");
    }
}

// ตรวจสอบการเลือกโหมดเมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", () => {
    // รับค่าจาก localStorage ว่าผู้ใช้เลือกโหมดไหน
    const savedMode = localStorage.getItem("theme");

    if (savedMode) {
        document.body.classList.add(savedMode);
        document.querySelector("header").classList.add(savedMode);
        document.querySelector(".container").classList.add(savedMode);
    }
});

// ฟังก์ชันสลับโหมด
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector("header");
    const container = document.querySelector(".container");

    // สลับโหมดระหว่าง light-mode และ dark-mode
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        header.classList.remove("light-mode");
        header.classList.add("dark-mode");
        container.classList.remove("light-mode");
        container.classList.add("dark-mode");

        // บันทึกโหมดที่เลือกใน localStorage
        localStorage.setItem("theme", "dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        header.classList.remove("dark-mode");
        header.classList.add("light-mode");
        container.classList.remove("dark-mode");
        container.classList.add("light-mode");

        // บันทึกโหมดที่เลือกใน localStorage
        localStorage.setItem("theme", "light-mode");
    }
}

// ฟังก์ชันเพิ่มปุ่มสลับโหมด
const themeToggleButton = document.createElement("button");
themeToggleButton.id = "theme-toggle";
themeToggleButton.textContent = "🌙 Dark Mode / Light Mode";
themeToggleButton.addEventListener("click", toggleTheme);

// เพิ่มปุ่มสลับโหมดที่มุมขวาบน
document.body.appendChild(themeToggleButton);

function toggleAnswer(id) {
    var answer = document.getElementById(id);
    answer.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
    loadResult();
});

function calculateRisk() {
    let age = document.getElementById("age").value;
    let bmi = document.getElementById("bmi").value;
    let bloodSugar = document.getElementById("blood_sugar").value;
    let familyHistory = document.getElementById("family_history").value === "yes";
    let physicalActivity = document.getElementById("physical_activity").value === "yes";

    // คำนวณความเสี่ยงเบื้องต้น
    let riskLevel = calculateRiskLevel(bmi, bloodSugar, familyHistory, physicalActivity);

    // สร้างข้อมูลแบบ JSON
    let newResult = {
        age: age,
        bmi: bmi,
        bloodSugar: bloodSugar,
        familyHistory: familyHistory,
        physicalActivity: physicalActivity,
        riskLevel: riskLevel
    };

    // ดึงข้อมูลเก่าจาก `localStorage`
    let result = JSON.parse(localStorage.getItem("diabetesResult")) || [];

    // เพิ่มข้อมูลใหม่ลงไป
    result.push(newResult);

    // บันทึกข้อมูลใหม่ลง `localStorage`
    localStorage.setItem("diabetesResult", JSON.stringify(result));

    // ไปที่หน้า `result.html`
    window.location.href = "result.html";
}

function calculateRiskLevel(bmi, bloodSugar, familyHistory, physicalActivity) {
    let risk = "ปานกลาง"; // ค่าเริ่มต้น

    if (bmi >= 30 || bloodSugar > 126) {
        risk = "สูง";
    } else if (bmi >= 25 || bloodSugar >= 100) {
        risk = "ปานกลาง";
    } else {
        risk = "ต่ำ";
    }

    return risk;
}

document.addEventListener("DOMContentLoaded", function () {
    loadResult();
});

function loadResult() {
    let result = JSON.parse(localStorage.getItem("diabetesResult")) || [];
    let tableBody = document.getElementById("result-body");

    tableBody.innerHTML = ""; // ล้างข้อมูลก่อนแสดงใหม่

    result.forEach(result => {
        let row = `
            <tr>
                <td>${result.age}</td>
                <td>${result.bmi}</td>
                <td>${result.bloodSugar}</td>
                <td>${result.familyHistory ? "มี" : "ไม่มี"}</td>
                <td>${result.physicalActivity ? "ใช่" : "ไม่"}</td>
                <td><strong>${result.riskLevel}</strong></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function clearResult() {
    localStorage.removeItem("diabetesResult");
    location.reload(); // รีเฟรชหน้า
}