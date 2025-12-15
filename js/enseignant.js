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
        console.log(data);
        showEnseignant(data);
        })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function showEnseignant(data) {
    var sectionEnseignant = document.getElementById("enseignant");
    sectionEnseignant.innerHTML = "";
    console.log(data)
    data.enseignants.forEach(element => {
        var newEnseignant = document.createElement("div");
        newEnseignant.textContent = element.nom;
        sectionEnseignant.appendChild(newEnseignant);
    });
}