let currentIndex = 0;
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;

function showCards() {
    cards.forEach((card, index) => {
        card.style.display = (index >= currentIndex && index < currentIndex + 3)
            ? 'block'
            : 'none';
    });
}

function next() {
    if (currentIndex < totalCards - 3) {
        currentIndex++;
        showCards();
    }
}

function prev() {
    if (currentIndex > 0) {
        currentIndex--;
        showCards();
    }
}

showCards();

function handleUpload(event) {
    event.preventDefault();

    const college = document.getElementById("collegeSelect").value;
    const fileName = document.getElementById("fileName").value;
    const fileInput = document.getElementById("fileInput").files[0];

    if (fileInput) {
        const note = {
            college: college,
            fileName: fileName,
            fileURL: URL.createObjectURL(fileInput)
        };

        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));

        alert("Note uploaded successfully!");
        loadNotes();
    } else {
        alert("Please select a file to upload.");
    }
}

function loadNotes() {
    const notesContainer = document.getElementById("notesContainer");
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (notes.length === 0) {
        notesContainer.innerHTML = "<p>No notes available. Upload some!</p>";
    } else {
        notesContainer.innerHTML = notes
            .map(note => `
                <div class="note-card">
                    <h3>${note.fileName}</h3>
                    <p>College: ${note.college}</p>
                    <a href="${note.fileURL}" target="_blank">View Note</a>
                </div>
            `)
            .join("");
    }
}

document.addEventListener("DOMContentLoaded", loadNotes);
