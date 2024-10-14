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
    
    const averageAge = ages.reduce((acc, age) => {
        return {
            years: acc.years + age.years,
            months: acc.months + age.months,
            days: acc.days + age.days,
            totalDays: acc.totalDays + age.totalDays,
        };
    }, {years: 0, months: 0, days: 0, totalDays: 0});

    const averageAgeFormatted = formatAge(averageAge);
    document.getElementById('averageAge').innerText = `Average Age: ${averageAgeFormatted}`;
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
        totalDays: years * 365 + months * 30 + days, // Rough estimation for total days
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
