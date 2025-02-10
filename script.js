document.querySelector(".calculate-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let dayInput = document.getElementById("day");
    let monthInput = document.getElementById("month");
    let yearInput = document.getElementById("year");

    let errorDay = document.getElementById("error-day");
    let errorMonth = document.getElementById("error-month");
    let errorYear = document.getElementById("error-year");

    let day = dayInput.value.trim();
    let month = monthInput.value.trim();
    let year = yearInput.value.trim();

    let isValid = true;

    // Reset previous error messages & remove error styles
    function clearError(input, errorElement) {
        errorElement.textContent = "";
        input.parentElement.classList.remove("error");
    }
    clearError(dayInput, errorDay);
    clearError(monthInput, errorMonth);
    clearError(yearInput, errorYear);

    // Validate empty fields
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.parentElement.classList.add("error");
        isValid = false;
    }

    if (!day) showError(dayInput, errorDay, "This field is required");
    if (!month) showError(monthInput, errorMonth, "This field is required");
    if (!year) showError(yearInput, errorYear, "This field is required");

    // Stop further validation if any field is empty
    if (!isValid) return;

    // Convert inputs to numbers
    let dayNum = parseInt(day, 10);
    let monthNum = parseInt(month, 10);
    let yearNum = parseInt(year, 10);
    let currentYear = new Date().getFullYear();

    // Validate ranges
    if (dayNum < 1 || dayNum > 31) showError(dayInput, errorDay, "Must be a valid day");
    if (monthNum < 1 || monthNum > 12) showError(monthInput, errorMonth, "Must be a valid month");
    if (yearNum > currentYear) showError(yearInput, errorYear, "Must be in the past");

    // Validate if the date is real (e.g., 31st Feb is invalid)
    let testDate = new Date(yearNum, monthNum - 1, dayNum);
    if (
        testDate.getFullYear() !== yearNum ||
        testDate.getMonth() !== monthNum - 1 ||
        testDate.getDate() !== dayNum
    ) {
        showError(dayInput, errorDay, "Must be a valid date");
        showError(monthInput, errorMonth);
        showError(yearInput, errorYear);
    }

    if (isValid) {
        console.log("Valid Date Entered");
        calculateAge(dayNum, monthNum, yearNum);
    }
});

function calculateAge(day, month, year) {
    let today = new Date();
    let birthDate = new Date(year, month - 1, day);
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    document.getElementById("years").textContent = ageYears;
    document.getElementById("months").textContent = ageMonths;
    document.getElementById("days").textContent = ageDays;
}
