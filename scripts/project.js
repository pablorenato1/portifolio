
const lang = document.documentElement.lang;

const data = fetch("https://raw.githubusercontent.com/pablorenato1/portifolio/refs/heads/fix/structure-projects/projects/project.json")
    .then(response => {
    if (!response.ok) {
        throw new Error("Erro ao carregar o JSON");
    }
    return response.json();
})

function fillThePlaceHolders() {
}