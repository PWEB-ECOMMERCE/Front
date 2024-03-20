# Como escreveremos nossas mensagens de commit

Eai, beleza, pra gente manter um padrão no nosso trabalho,,
resolvi escrever aqui um guia de mensagem de commit, esse guia
é baseado em uma especificação **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)** que serve
pra automatizar a criação de versão de um projeto.

**! Significa Obrigatório**

**? Pode ter ou não**

As regras são simples todo commit tem(!) que ter um tipo, poderemos(?) ter um
escopo então seguiremos para ":", um espaço e tem(!) que ter um assunto.

!type(?scope): !subject

Caso vc queira continuar a trazer um contexto maior pro commit vc pode adicionar
um body com mais informações e um footer também, mas n é obrigado

```bash
!type(?scope): !subject
# !Linha vazia
<?body>
# !Linha vazia
<?footer>
```

Show de bola e aqui segue os tipos que iremos usar:

**test**: indica qualquer tipo de criação ou alteração de códigos de teste. Exemplo: Criação de testes unitários.
feat: indica o desenvolvimento de uma nova feature ao projeto. Exemplo: Acréscimo de um serviço, funcionalidade, endpoint, etc.

**refactor**: usado quando houver uma refatoração de código que não tenha qualquer tipo de impacto na lógica/regras de negócio do sistema. Exemplo: Mudanças de código após um code review

**style**: empregado quando há mudanças de formatação e estilo do código que não alteram o sistema de nenhuma forma.
Exemplo: Mudar o style-guide, mudar de convenção lint, arrumar indentações, remover espaços em brancos, remover comentários, etc..

**fix:** utilizado quando há correção de erros que estão gerando bugs no sistema.
Exemplo: Aplicar tratativa para uma função que não está tendo o comportamento esperado e retornando erro.

**chore:** indica mudanças no projeto que não afetem o sistema ou arquivos de testes. São mudanças de desenvolvimento.
Exemplo: Mudar regras do eslint, adicionar prettier, adicionar mais extensões de arquivos ao .gitignore

**docs:** usado quando há mudanças na documentação do projeto.
Exemplo: adicionar informações na documentação da API, mudar o README, etc.

**build:** utilizada para indicar mudanças que afetam o processo de build do projeto ou dependências externas.
Exemplo: Gulp, adicionar/remover dependências do npm, etc.

**perf:** indica uma alteração que melhorou a performance do sistema.
Exemplo: alterar ForEach por while, melhorar a query ao banco, etc.

**ci:** utilizada para mudanças nos arquivos de configuração de CI.
Exemplo: Circle, Travis, BrowserStack, etc.

**revert:** indica a reverão de um commit anterior.


[ Artigo sobre isso em português ](https://medium.com/linkapi-solutions/conventional-commits-pattern-3778d1a1e657)


## Branch

Beleza, o Git é diferente do github, o github é onde hospeda nosso projeto, o
git é a ferramenta de controle de versão que tem os comandos pra poder salvar
varias fotos do nosso projeto para caso queiramos voltar em alguma versão
passada. Dito isso, o git tem a possibilidade de cada um trabalhar sem
atrapalhar o outro por meio de branchs (normalmente a branch principal se chama
**main** ou **master** ), porém nosso trabalho vai se basear em uma branch
diferente chamada **develop** (pois essa vai ser a branch onde a gnt vai produzir
nossas coisas) e deixaremos a branch principal apenas para entregar versões mais
completas e polidas pro professor ou o pessoal do backend.

### Conceitos que é bom saber:

Branch remota e Branch local
Saber comandos básicos
Saber como fazer pull (atualiza o local por meio do remoto)
Saber como fazer push (salva os commits locais no remoto)
Saber o que é e como fazer um merge e pull request

### Como vai ser o workflow:

Toda vez que vc for criar algo novo ou ajeitar algo do código vc vai criar uma
branch nova a partir da branch **develop** com seu nome e algum indicador do que
vc vai fazer, por exemplo: Eu vou ajeitar um bug no código que eu vi, então eu
vou criar uma branch com o nome dante-fix-label e trabalharei nessa branch. Após
concluir meu trabalho, eu vou fazer um merge para a branch develop, o ideal
seria fazer um pull request para que outra pessoa possa olhar o código que vc
fez.

**OBS: SEMPRE ATUALIZAR A BRANCH DEVELOP para trabalhar com o projeto mais
recente**

Commandos para gente n esquecer:

```
git pull # atualiza a branch que vc ta
git add nome_do_arquivo # coloca o arquivo em modo staged
git commit -m "mensagem" # commita (bate foto) o código no repositório
git push -u origin nome_da_branch # envia o código local para nova branch remota
git push # envia o código local para uma branch remota
```

### Curiosidades

Os programas que estamos usando para o git são:

- Husky (permite executar coisas ao commitar ou fazer push ou seja,
automação na hora de usar o git)
- Commitlint (ferramenta que analisará nosso commit e dirá se ele ta dentro do
padrao)
- Commitizen (ferramenta que ajuda a criar um commit no padrão do nosso
projeto)
