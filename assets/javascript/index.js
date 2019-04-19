const loadData = data => {
        data.forEach(item => {
                const person = item.data();
                console.log(`person ${person}`);
                const li = document.createElement('li');
                li.innHTML = `
                <div>${person.born}</div>
                <div>${person.first}</div>
                <div>${person.last}</div>
                `;
                dataDiv.appendChild(li);
        });
};
