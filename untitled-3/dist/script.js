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

// Toggle Dark Mode
document.getElementById("toggle-theme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});