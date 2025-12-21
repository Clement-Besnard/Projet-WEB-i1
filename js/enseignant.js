let allEnseignants = [];

function fetchJSON(url) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            throw new Error('Empty JSON or malformed JSON');
        }
        allEnseignants = data.enseignants;
        filterAndShow();
        setupFilters();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function showEnseignant(list) {
    var sectionEnseignant = document.getElementById("enseignants");
    sectionEnseignant.innerHTML = "";
    const sortedList = [...list].sort((a, b) => a.nom.localeCompare(b.nom));
    sortedList.forEach(element => {
        var newEnseignant = document.createElement("div");
        var img = document.createElement("img");
        img.className = "photoprofil"
        img.src = element.image ? "../img/enseignants/" + element.image : "../img/default_enseignant.jpg";
        newEnseignant.appendChild(img);
        var info = document.createElement("span");
        info.innerHTML = element.nom
        newEnseignant.appendChild(info);
        var matiere = document.createElement("span");
        matiere.innerHTML = "matières :<br> - " + element.matières.join("<br> - ") + "";
        matiere.className = "matiere";
        newEnseignant.appendChild(matiere);
        newEnseignant.className = "enseignant"
        sectionEnseignant.appendChild(newEnseignant);
    });
}

function filterAndShow() {
    const nameInput = document.getElementById("filter-nom");
    const matiereInput = document.getElementById("filter-matiere");
    const nameValue = nameInput.value.trim().toLowerCase();
    const matiereValue = matiereInput.value.trim().toLowerCase();
    const filtered = allEnseignants.filter(e => {
        const matchNom = e.nom.toLowerCase().includes(nameValue);
        const matchMatiere = e.matières.some(m => m.toLowerCase().includes(matiereValue));
        return matchNom && matchMatiere;
    });
    showEnseignant(filtered);
}

function setupFilters() {
    const nameInput = document.getElementById("filter-nom");
    const matiereInput = document.getElementById("filter-matiere");
    nameInput.addEventListener("input", filterAndShow);
    matiereInput.addEventListener("input", filterAndShow);
}