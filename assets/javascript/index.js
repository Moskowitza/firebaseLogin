const dataDiv = document.getElementById('dataDiv');

const loadData = data => {
        dataDiv.classList.remove('hidden');
        data.forEach(item => {
                const person = item.data();
                console.log(`person ${person}`);
                const li = `
                <div>${person.born}</div>
                <div>${person.first}</div>
                <div>${person.last}</div>
                `;
                dataDiv.appendChild(li);
        });
};
