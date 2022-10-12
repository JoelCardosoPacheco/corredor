    
    let botaoInserir = document.querySelector('#inserir')
    
    botaoInserir.addEventListener('click', function() {
    
    let formulario = document.querySelector('#form-adiciona')

    let inscrito = dadosDoIscrito(formulario)

    adicionaInscrito(inscrito)
    
    formulario.reset()
})
// remover linha da tabela
tabela.addEventListener('dblclick', function(event) {
    let alvo = event.target
    let alvoPai = alvo.parentNode
    alvoPai.remove();
})
// Adiciona o individuo na tabela
function adicionaInscrito(inscrito) {
    let inscritoTr = adicionaTr(inscrito)
    let tabela = document.querySelector('#tabela')
    tabela.appendChild(inscritoTr)
}
// dados do formulario para inserir na tabela, tem que ser identico a os nomes correspondentes....
function dadosDoIscrito(formulario) {
    let inscrito = {
        nome: formulario.nome.value,
        cpf: formulario.cpf.value,
        dataNascimento: formulario.dataNascimento.value,
        endereco: formulario.endereco.value,
        telefone: formulario.telefone.value,
        cep: formulario.cep.value,
        email: formulario.email.value,
        distancia: formulario.distancia.value,
        idade: calcularIdade(formulario.dataNascimento.value)
    }
    return inscrito
}
function adicionaTr(inscrito) {
    let inscritoTr = document.createElement('tr')
    inscritoTr.classList.add('inscrito')

    inscritoTr.appendChild(adicionaTd(inscrito.nome, "info-nome"))
    inscritoTr.appendChild(adicionaTd(inscrito.cpf, 'info-cpf'))
    inscritoTr.appendChild(adicionaTd(inscrito.idade,'info-idade'))
    inscritoTr.appendChild(adicionaTd(inscrito.telefone,'info-telefone'))
    inscritoTr.appendChild(adicionaTd(inscrito.distancia,'info-distancia'))
    

    return inscritoTr
}

function adicionaTd(dado, classe) {
    var td = document.createElement("td")
    td.textContent = dado
    td.classList.add(classe)
    return td

}
function calcularIdade (datansc) {
    
    var d = new Date()
        anoAtual = d.getFullYear()
        mesAtual = d.getMonth() + 1
        diaAtual = d.getDate()

        niver = new Date(datansc)
        anoAniversario = niver.getFullYear()
        mesAniversario = niver.getMonth()
        diaAniversario = niver.getDate()


        quantosAnos = anoAtual - anoAniversario;
        
        if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
            quantosAnos--
        }  
        
        
        return quantosAnos < 0 ? 0 : quantosAnos;
}

let pesquisa  = document.querySelector('#filtro')
pesquisa.addEventListener('input', function() {
    let inscritos = document.querySelectorAll('.inscrito')

    if (this.value.length > 0) {
        for(let pos = 0; pos < inscritos.length; pos++ ) {
            let inscrito = inscritos[pos]
            
            let nomeTd = inscrito.querySelector('.info-nome')
            
            let nome = nomeTd.textContent
            
            let expressaoBusca = new RegExp(this.value, 'i')
            
            if (!expressaoBusca.test(nome)) {
                inscrito.classList.add('invisivel')
            } else {
                inscrito.classList.remove('invisivel')
            }
        }
    } else {
        for ( pos = 0 ; pos < inscritos.length; pos++) {
            let inscrito = inscritos[pos]
            
            inscrito.classList.remove('invisivel')
        }
    }

})