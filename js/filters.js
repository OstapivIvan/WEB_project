const allParticipantsDiv = document.getElementById('allParticipantsList');

document.addEventListener("DOMContentLoaded", function () {
    const participantsData = JSON.parse(localStorage.getItem('surveyData'));

    if (participantsData) {
        displayAllParticipants(participantsData);
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'No participant data found.';
        errorDiv.classList.add('error-message');
        allParticipantsDiv.appendChild(errorDiv);
    }

});

function displayAllParticipants(participantsData) {
    const table = document.createElement('table');
    table.id = "allParticipantsTable"
    const caption = document.createElement('caption');
    caption.textContent = 'Participants Information';
    table.appendChild(caption);
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Full Name', 'Phone', 'Age', 'Position', 'Foot', 'Height'];
    // Створюємо рядок заголовка
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    // Додаємо дані про кожного учасника
    participantsData.forEach(participant => {
        const rowData = {
            'Full Name': participant.fullName,
            'Phone': participant.phone,
            'Age': calculateAge(participant.dob),
            'Position': participant.position,
            'Foot': participant.foot,
            'Height': participant.height
        };
        const row = document.createElement('tr');
        headers.forEach(headerText => {
            const cell = document.createElement('td');
            cell.textContent = rowData[headerText];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    allParticipantsDiv.appendChild(table);
}

function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getUTCFullYear() - dobDate.getFullYear();
    return age;
}
