const dataDiv = document.getElementById('dataDiv');

const loadData = data => {
        data.forEach(item => {
                const person = item.data();
                console.log(person);
                const li = `
                <div>${item.born}</div>
                <div>${item.first}</div>
                <div>${item.last}</div>
                `;
        });
};
