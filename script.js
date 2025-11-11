document.getElementById('ageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  calculateAge();
});

function calculateAge() {
  const birthdateInput = document.getElementById('birthdate').value;
  
  if (!birthdateInput) {
    alert('Please enter your date of birth');
    return;
  }
  
  const birthdate = new Date(birthdateInput);
  const today = new Date();
  
  // Check if birthdate is in the future
  if (birthdate > today) {
    alert('Birth date cannot be in the future!');
    return;
  }
  
  // Calculate age
  const ageData = getDetailedAge(birthdate, today);
  
  // Display results
  displayResults(ageData);
}

function getDetailedAge(birthdate, today) {
  let years = today.getFullYear() - birthdate.getFullYear();
  let months = today.getMonth() - birthdate.getMonth();
  let days = today.getDate() - birthdate.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate total days lived
  const oneDay = 24 * 60 * 60 * 1000;
  const totalDays = Math.floor((today - birthdate) / oneDay);
  
  // Calculate next birthday
  const nextBirthdayData = getNextBirthday(birthdate, today);
  
  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday: nextBirthdayData
  };
}

function getNextBirthday(birthdate, today) {
  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());
  
  // If birthday has passed this year, calculate for next year
  if (nextBirthday < today) {
    nextBirthday = new Date(currentYear + 1, birthdate.getMonth(), birthdate.getDate());
  }
  
  // Calculate days until next birthday
  const oneDay = 24 * 60 * 60 * 1000;
  const daysUntil = Math.ceil((nextBirthday - today) / oneDay);
  
  return {
    date: nextBirthday,
    daysUntil
  };
}

function displayResults(ageData) {
  // Update age numbers
  document.getElementById('years').textContent = ageData.years;
  document.getElementById('months').textContent = ageData.months;
  document.getElementById('days').textContent = ageData.days;
  
  // Update additional info
  document.getElementById('totalDays').textContent = 
    `You have lived for ${ageData.totalDays.toLocaleString()} days!`;
  
  const birthdayText = ageData.nextBirthday.daysUntil === 0 
    ? '🎉 Happy Birthday! 🎉' 
    : `Your next birthday is in ${ageData.nextBirthday.daysUntil} day${ageData.nextBirthday.daysUntil !== 1 ? 's' : ''}`;
  
  document.getElementById('nextBirthday').textContent = birthdayText;
  
  // Show result section
  document.getElementById('result').classList.remove('hidden');
}
