
// Gespeicherte Aufgaben laden
let aufgaben = JSON.parse(
    localStorage.getItem("meineAufgaben")
) || [];

// Aufgaben speichern
function aufgabenSpeichern() {
    localStorage.setItem(
        "meineAufgaben",
        JSON.stringify(aufgaben)
    );
}

// Aufgaben anzeigen
function aufgabenAnzeigen() {

    const liste = document.getElementById("aufgabenListe");

    liste.innerHTML = "";

    // Zähler vorbereiten
    let offeneAufgaben = 0;
    let erledigteAufgaben = 0;

    aufgaben.forEach(function(aufgabe, index) {

        const eintrag = document.createElement("li");

        // Textbereich erstellen
        const text = document.createElement("span");

        text.textContent = aufgabe.text;
        text.className = "aufgabenText";

        // Erledigte Aufgaben markieren
        if (aufgabe.erledigt) {

            eintrag.classList.add("erledigt");
            erledigteAufgaben++;

        } else {

            offeneAufgaben++;

        }

        // Aufgabe abhaken
        text.addEventListener("click", function() {

            aufgaben[index].erledigt =
                !aufgaben[index].erledigt;

            aufgabenSpeichern();
            aufgabenAnzeigen();

        });

        // Löschen-Button erstellen
        const loeschen = document.createElement("button");

        loeschen.textContent = "Löschen";
        loeschen.className = "loeschenButton";

        // Aufgabe löschen
        loeschen.addEventListener("click", function() {

            aufgaben.splice(index, 1);

            aufgabenSpeichern();
            aufgabenAnzeigen();

        });

        // Elemente zusammensetzen
        eintrag.appendChild(text);
        eintrag.appendChild(loeschen);

        liste.appendChild(eintrag);

    });

    // Aufgabenstatistik aktualisieren
    document.getElementById("aufgabenStatus").textContent =
        "Offen: " + offeneAufgaben +
        " | Erledigt: " + erledigteAufgaben;
}

// Neue Aufgabe hinzufügen
function aufgabeHinzufuegen() {

    const eingabe = document.getElementById("aufgabe");

    const text = eingabe.value.trim();

    if (text === "") {
        alert("Bitte eine Aufgabe eingeben!");
        return;
    }

    aufgaben.push({
        text: text,
        erledigt: false
    });

    aufgabenSpeichern();
    aufgabenAnzeigen();

    eingabe.value = "";
}

// Beim Start Aufgaben anzeigen
aufgabenAnzeigen();
