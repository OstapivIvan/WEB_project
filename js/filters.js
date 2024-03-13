const allParticipantsDiv = document.getElementById('allParticipantsList');
const filteredParticipantsDiv = document.getElementById('participantsFilter');


document.addEventListener("DOMContentLoaded", function () {
    const participantsData = JSON.parse(localStorage.getItem('surveyData'));
    const rightFootedPlayers = participantsData.filter(participant => participant.foot === 'Right');
    const heightRangeFilter = participantsData.filter(participant => participant.height >= 180 && participant.height <= 187);
    const ageRangeFilter = participantsData.filter(participant => calculateAge(participant.dob) <= 25);
    const ageAndHeightFilter = participantsData.filter(participant => calculateAge(participant.dob) > 25 && participant.height > 180);
    const leftFootedDefenders = participantsData.filter(participant => participant.foot === 'Left' && participant.position === 'defender');

    if (participantsData) {
        displayAllParticipants(participantsData);
        displayFilteredParticipants(rightFootedPlayers, 'Right-footed footballers')
        displayFilteredParticipants(heightRangeFilter, 'Footballers with a height between 180 and 187')
        displayFilteredParticipants(ageRangeFilter, 'Footballers 25 years old and younger')
        displayFilteredParticipants(ageAndHeightFilter, 'Football players over the age of 25 and taller than 180 cm')
        displayFilteredParticipants(leftFootedDefenders, 'Left-footed defenders')
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

function displayFilteredParticipants(participantsData, listName) {
    // Створюємо контейнер для списку
    const filteredListContainer = document.createElement('div');
    const listCaption = document.createElement('h4');
    listCaption.textContent = listName;
    filteredListContainer.appendChild(listCaption);

    // Створюємо список учасників
    if (participantsData && participantsData.length > 0) {
        const filteredParticipantsList = document.createElement('ul');
        participantsData.forEach(participant => {
            const listItem = document.createElement('li');
            listItem.textContent = `${participant.fullName}`;
            filteredParticipantsList.appendChild(listItem);
        });
        filteredListContainer.appendChild(filteredParticipantsList);
    }
    else {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No participant data found.';
        filteredListContainer.appendChild(noDataMessage);
    }

    // Додаємо контейнер зі списком у відповідний div
    filteredParticipantsDiv.appendChild(filteredListContainer);
}
