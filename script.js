const btnUpload = document.querySelector(".upload-btn");
const inputUpload = document.querySelector("#img-upload");

btnUpload.addEventListener("click", () => {
    //clicando no btn executa o input de img
    //que está invisivel
    inputUpload.click();
})

function lerConteudoDoArquivo (arquivo) {
    //quando n se sabe a duração da execução
    //ou se vai dar certo ou n
    return new Promise((resolve, reject) => {
        //leitor do arquivo recebido
        const leitor = new FileReader();

        //se der certo o carregamento do arquivo
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name})
        }

        //se der errado
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        //le o arquivo
        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".img-principal")
const nomeDaImagem = document.querySelector(".upload-nome-img p");

//quando o input receber a img
                            //async == função assincrona
inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    //se o arquivo existe
    if(arquivo){
        try{
                                //await a função q deseja executar cm o async
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        }
        catch (erro){
            console.error("Erro na leitura do arquivo");
        }
    }
} )


//CATEGORIAS --------------

const inputTags = document.querySelector("#categoria");
const listaTagsContainer = document.querySelector(".lista-tags");

inputTags.addEventListener("keypress", (evento) => {
    if(evento.key === "Enter"){
        //para n atualizar a tela
        evento.preventDefault();

        //remove espaços em branco antes e depois da palavra
        const tagTexto = inputTags.value.trim();

        if(tagTexto !== ""){
            const tagNova =  document.createElement("li");
            tagNova.innerHTML = `
            <p>${tagTexto}</p>
            <button class="btn-fechar">X</button>
            `
            listaTagsContainer.appendChild(tagNova);
            inputTags.value = "";
        }
    }
})

listaTagsContainer.addEventListener("click", (evento) => {
    //verificando se foi o btn q foi clicado atraves da classe
    if (evento.target.classList.contains("btn-fechar")){
        //seleciona o pai do btn
        const tagParaRemover = evento.target.parentElement;

        listaTagsContainer.removeChild(tagParaRemover);
    }
})
