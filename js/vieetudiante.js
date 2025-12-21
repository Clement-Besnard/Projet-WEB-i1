document.addEventListener('DOMContentLoaded', function () {
    fetch('../json/associations.json')
        .then(response => response.json())
        .then(data => createAssociationList(data));

    function createAssociationList(assos) {
        const container = document.getElementById('associations-list');
        assos.forEach((asso, idx) => {
            const card = document.createElement('div');
            card.className = 'asso-card';
            card.innerHTML = `
                <div class="asso-front">
                    <img src="../img/associations/${asso.image}" alt="${asso.nom}">
                    <h3>${asso.nom}</h3>
                </div>
                <div class="asso-back">
                    <p>${asso.description}</p>
                </div>
            `;
            card.addEventListener('click', function () {
                card.classList.toggle('flipped');
            });
            container.appendChild(card);
        });
    }
});
