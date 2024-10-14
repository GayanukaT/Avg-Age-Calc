let birthdays = [];

document.getElementById('addBtn').addEventListener('click', function () {
    const birthdayInput = document.getElementById('birthday').value;
    if (validateBirthday(birthdayInput)) {
        birthdays.push(new Date(birthdayInput));
        document.getElementById('birthday').value = ''; // Clear the input
        updateBirthdayList();
    } else {
        alert("Please enter a valid birthday.");
    }
});

document.getElementById('calculateBtn').addEventListener('click', function () {
    if (birthdays.length === 0) {
        alert("Please add at least one birthday.");
        return;
    }

    const ages = birthdays.map(b => calculateAge(b));
    const youngestAge = Math.min(...ages.map(age => age.totalDays));
    const oldestAge = Math.max(...ages.map(age => age.totalDays));
    
    const totalYears = ages.reduce((sum, age) => sum + age.years, 0);
    const totalMonths = ages.reduce((sum, age) => sum + age.months, 0);
    const totalDays = ages.reduce((sum, age) => sum + age.days, 0);

    const averageYears = Math.floor(totalYears / birthdays.length);
    const averageMonths = Math.floor(totalMonths / birthdays.length);
    const averageDays = Math.floor(totalDays / birthdays.length);

    // Adjust average months and days
    let finalYears = averageYears;
    let finalMonths = averageMonths;
    let finalDays = averageDays;

    // Handle overflow of days
    if (finalDays >= 30) {
        finalMonths += Math.floor(finalDays / 30);
        finalDays = finalDays % 30;
    }

    // Handle overflow of months
    if (finalMonths >= 12) {
        finalYears += Math.floor(finalMonths / 12);
        finalMonths = finalMonths % 12;
    }

    document.getElementById('averageAge').innerText = `Average Age: ${finalYears} years, ${finalMonths} months, and ${finalDays} days`;
    document.getElementById('youngestAge').innerText = `Youngest Age: ${formatAge(calculateAge(birthdays[ages.findIndex(age => age.totalDays === youngestAge)]))}`;
    document.getElementById('oldestAge').innerText = `Oldest Age: ${formatAge(calculateAge(birthdays[ages.findIndex(age => age.totalDays === oldestAge)]))}`;
});

function calculateAge(birthday) {
    const today = new Date();
    let years = today.getFullYear() - birthday.getFullYear();
    let months = today.getMonth() - birthday.getMonth();
    let days = today.getDate() - birthday.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        years: years,
        months: months,
        days: days,
        totalDays: years * 365 + months * 30 + days,
    };
}

function formatAge(age) {
    return `${age.years} years, ${age.months} months, and ${age.days} days`;
}

function validateBirthday(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    return birthDate <= today;
}

function updateBirthdayList() {
    const list = document.getElementById('birthdayList');
    list.innerHTML = '';
    birthdays.forEach(b => {
        const listItem = document.createElement('li');
        listItem.innerText = b.toDateString();
        list.appendChild(listItem);
    });
}
