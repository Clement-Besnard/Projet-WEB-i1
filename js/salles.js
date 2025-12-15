const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const heures = ["8h","9h","10h","11h","12h","13h","14h","15h","16h","17h"];

function getPermanences() {
    return JSON.parse(localStorage.getItem("permanences") || "[]");
}
function savePermanences(permanences) {
    localStorage.setItem("permanences", JSON.stringify(permanences));
}

function renderCalendar() {
    const permanences = getPermanences();
    let html = '<tr><th>Heure</th>';
    for (const jour of jours) html += `<th>${jour}</th>`;
    html += '</tr>';
    for (const heure of heures) {
        html += `<tr><th>${heure}</th>`;
        for (const jour of jours) {
            const perm = permanences.find(p => p.jour === jour && p.heure === heure);
            if (perm) {
                html += `<td class="occupied">${perm.salle}<br><small>${perm.prof}</small></td>`;
            } else {
                html += `<td></td>`;
            }
        }
        html += '</tr>';
    }
    document.getElementById("calendar-table").innerHTML = html;
}

const modalBg = document.getElementById("modal-bg");
document.getElementById("add-permanence-btn").onclick = () => {
    modalBg.style.display = "flex";
};
document.getElementById("close-modal").onclick = closeModal;
document.getElementById("cancel-btn").onclick = closeModal;

function closeModal() {
    modalBg.style.display = "none";
    document.getElementById("permanence-form").reset();
}
modalBg.onclick = function(e) {
    if (e.target === modalBg) closeModal();
};

document.getElementById("permanence-form").onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    const permanences = getPermanences();
    if (permanences.some(p => p.jour === data.jour && p.heure === data.heure)) {
        alert("Il y a déjà une permanence à ce créneau !");
        return;
    }
    permanences.push(data);
    savePermanences(permanences);
    renderCalendar();
    closeModal();
};

document.getElementById("reset-salles-btn").onclick = function() {
    if (confirm("Voulez-vous vraiment supprimer toutes les permanences ?")) {
        savePermanences([]);
        renderCalendar();
    };
};

renderCalendar();