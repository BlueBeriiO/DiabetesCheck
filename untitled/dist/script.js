function calculateRisk() {
    let age = parseInt(document.getElementById("age").value);
    let bmi = parseFloat(document.getElementById("bmi").value);
    let bloodSugar = parseFloat(document.getElementById("blood_sugar").value);
    let familyHistory = document.getElementById("family_history").value === "yes";
    let physicalActivity = document.getElementById("physical_activity").value === "yes";

    let resultBox = document.getElementById("result");

    // เช็กว่าผู้ใช้กรอกข้อมูลครบหรือไม่
    if (isNaN(age) || isNaN(bmi) || isNaN(bloodSugar)) {
        resultBox.innerHTML = "<span style='color: red;'>⚠ กรุณากรอกข้อมูลให้ครบถ้วน</span>";
        resultBox.classList.remove("show-result");
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
    let resultColor = "";

    if (riskScore >= 6) {
        resultText = "❗ ความเสี่ยงสูง! ควรพบแพทย์เพื่อรับการตรวจเพิ่มเติม";
        resultColor = "red";
    } else if (riskScore >= 3) {
        resultText = "⚠ ความเสี่ยงปานกลาง ควรปรับพฤติกรรมการใช้ชีวิต";
        resultColor = "orange";
    } else {
        resultText = "✅ ความเสี่ยงต่ำ แต่ควรรักษาสุขภาพให้ดี";
        resultColor = "green";
    }

    resultBox.innerHTML = resultText;
    resultBox.style.color = "white";
    resultBox.style.background = resultColor;
    resultBox.classList.add("show-result");
}