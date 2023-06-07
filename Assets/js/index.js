const uf = document.querySelector('#slctUF'),
local = document.querySelector('#slctLocal'),
submitButton = document.querySelector('#submitBtn');

function selectUF() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            json.sort(function organizar(x, y) {
                let a = x.sigla.toUpperCase(),
                    b = y.sigla.toUpperCase();
                return a == b ? 0 : a > b ? 1 : -1;
            });
            for (let i = 0; i < json.length; i++) {
                let newopt = document.createElement('option');
                newopt.setAttribute('value', json[i].id);
                newopt.setAttribute('id', json[i].sigla);
                newopt.innerText = json[i].sigla;
                uf.appendChild(newopt);
            }
        })
}

uf.addEventListener('change', (element) => {
    local.innerHTML = '';
    local.removeAttribute('disabled');
    selectLocal(element.target.value);
});

function selectLocal(selectedUf) {
    local.innerHTML = '<option value="" disabled selected>Selecione</option>';
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            json.sort(function organizar(x, y) {
                let a = x.nome.toUpperCase(),
                    b = y.nome.toUpperCase();
                return a == b ? 0 : a > b ? 1 : -1;
            });
            for (let i = 0; i < json.length; i++) {
                let newopt = document.createElement('option');
                newopt.setAttribute('value', json[i].nome);
                newopt.innerText = json[i].nome;
                local.appendChild(newopt);
            }
        })
}

function submit() {
    if (uf.selectedIndex == 0 || uf.options.length == 0) {
        alert('Por favor, selecione uma UF.');
    }
    else if (local.selectedIndex <= 0 || local.options.length == 1) {
        alert('Por favor, selecione uma cidade.');
    }
    else {
        let optUf = uf.options[uf.selectedIndex].text;
        let optLocal = local.options[local.selectedIndex].text;
        alert(`Seu estado é ${optUf} e sua cidade é ${optLocal}`);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    uf.innerHTML = '<option id="optVoid" value="" disabled selected>Selecione</option>';
    selectUF();
});

submitButton.addEventListener('click', submit);

