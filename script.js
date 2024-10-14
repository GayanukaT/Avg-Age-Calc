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
    const averageAge = ages.reduce((a, b) => a + b, 0) / ages.length;
    const youngestAge = Math.min(...ages);
    const oldestAge = Math.max(...ages);

    document.getElementById('averageAge').innerText = `Average Age: ${averageAge.toFixed(2)}`;
    document.getElementById('youngestAge').innerText = `Youngest Age: ${youngestAge}`;
    document.getElementById('oldestAge').innerText = `Oldest Age: ${oldestAge}`;
});

function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
