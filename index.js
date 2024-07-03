// Main function to calculate the age based on the input date
const ageCalculator = () => {
    const today = new Date(); // Get the current date
    const inputDate = new Date(document.getElementById("date-input").value); // Get the input date from the date picker
  
    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
      alert("Please enter a valid date");
      displayResult("-", "-", "-");
      return;
    }
  
    // Extract the day, month, and year from the input date
    const birthDetails = {
      date: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear(),
    };
  
    // Extract the current day, month, and year
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
  
    // Check if the input date is in the future
    if (isFutureDate(birthDetails, currentDate, currentMonth, currentYear)) {
      alert("Not Born Yet");
      displayResult("-", "-", "-");
      return;
    }
  
    // Calculate the age
    const { years, months, days } = calculateAge(
      birthDetails,
      currentYear,
      currentMonth,
      currentDate
    );
  
    // Display the calculated age
    displayResult(days, months, years);
  };
  
  // Function to check if the input date is in the future
  const isFutureDate = (birthDetails, currentDate, currentMonth, currentYear) => {
    return (
      birthDetails.year > currentYear ||
      (birthDetails.year === currentYear &&
        (birthDetails.month > currentMonth ||
          (birthDetails.month === currentMonth && birthDetails.date > currentDate)))
    );
  };
  
  // Function to calculate the age
  const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year; // Calculate the year difference
    let months, days;
  
    // Adjust the months and years if the birth month is later in the year than the current month
    if (currentMonth < birthDetails.month) {
      years--;
      months = 12 - (birthDetails.month - currentMonth);
    } else {
      months = currentMonth - birthDetails.month;
    }
  
    // Adjust the days and months if the birth date is later in the month than the current date
    if (currentDate < birthDetails.date) {
      months--;
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Handle December to January transition
      const daysInLastMonth = getDaysInMonth(lastMonth, currentYear); // Get the number of days in the previous month
      days = daysInLastMonth - (birthDetails.date - currentDate); // Calculate the remaining days
    } else {
      days = currentDate - birthDetails.date; // Calculate the days difference
    }
  
    return { years, months, days }; // Return the calculated age
  };
  
  // Function to get the number of days in a specific month of a specific year
  const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0); // Check if the year is a leap year
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Number of days in each month
    return daysInMonth[month - 1]; // Return the number of days in the given month
  };
  
  // Function to display the calculated age in the HTML
  const displayResult = (bdate, bmonth, byear) => {
    document.getElementById("years").textContent = byear; // Display the years
    document.getElementById("months").textContent = bmonth; // Display the months
    document.getElementById("days").textContent = bdate; // Display the days
  };
  
  // Add an event listener to the button to trigger the age calculation when clicked
  document.getElementById("calc-age-btn").addEventListener("click", ageCalculator);
  