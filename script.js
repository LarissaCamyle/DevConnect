//UPLOAD DE IMAGEM ---------------------------------------
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


//CATEGORIAS ---------------------------------------------

const inputTags = document.querySelector("#categoria");
const listaTagsContainer = document.querySelector(".lista-tags");

//remove tag
listaTagsContainer.addEventListener("click", (evento) => {
    //verificando se foi o btn q foi clicado atraves da classe
    if (evento.target.classList.contains("btn-fechar")){
        //seleciona o pai do btn
        const tagParaRemover = evento.target.parentElement;

        listaTagsContainer.removeChild(tagParaRemover);
    }
})

//verifica se a tag corresponde com as existentes
const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "Banco de dados"];
//simulando um banco de dados onde essa função levaria tempo
async function verificarTagsDisponiveis(TagTexto){
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(TagTexto));
        }, 500)
    })

}

//adiciona tag
inputTags.addEventListener("keypress", async (evento) => {
    if(evento.key === "Enter"){
        //para n atualizar a tela
        evento.preventDefault();

        //remove espaços em branco antes e depois da palavra
        const tagTexto = inputTags.value.trim();

        if(tagTexto !== ""){
            try{
                const tagExiste = await verificarTagsDisponiveis(tagTexto);
                if(tagExiste){
                    const tagNova =  document.createElement("li");
                    tagNova.innerHTML = `
                    <p>${tagTexto}</p>
                    <button class="btn-fechar">X</button>
                    `
                    listaTagsContainer.appendChild(tagNova);
                    inputTags.value = "";
                }
                else{
                    alert("A tag não foi encontrada! Favor selecionar uma tag válida (Front-end, Programação, Data Science, Full-stack, Banco de dados)")
                    inputTags.value = "";
                }

            }catch (error){
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag");
            }
        }
    }
})


//PUBLICAR SIMULAÇÃO----------------------------------------------------------
//simulando um envio para o banco de dados

const btnPublicar = document.querySelector(".btn-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise ((resolve, reject) => {
        const sorte = Math.random() > 0.5;

        if(sorte){
            resolve("Projeto publicado com sucesso!")
        }
        else{
            reject("Erro ao publicar")
        }
    })
}

btnPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    alert("Publicação feita com sucesso!");

    const nomeDoProjeto = document.querySelector("#nome").value;
    const descricaoDoProjeto = document.querySelector("#descricao").value;
    //cria um array de tags e retorna somente o texto da tag
    const tagProjeto = Array.from(listaTagsContainer.querySelectorAll("p")).map((tag) => tag.textContent);

    try{
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagProjeto);
        console.log("Simulação deu certo");
    }
    catch (error) {
        console.log("Simulação deu errado: ", error);
    }
})


const btnDescartar = document.querySelector(".btn-descartar");

btnDescartar.addEventListener("click", (evento) =>{
    evento.preventDefault();

    const formulario = document.querySelector("form");

    //limpa todos os campos de texto
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image-projeto.png";

    listaTagsContainer.innerHTML = "";
} )
