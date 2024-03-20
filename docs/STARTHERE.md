# Início

Eai, vou falar brevemente sobre o nosso projeto

Primeiramente vamos usar Javascript HTML e CSS para
fazer nossas páginas, porém para facilitar, iremos usar
alguns frameworks e bibliotecas.

[ REACT ](https://pt-br.legacy.reactjs.org/) -> Uma biblioteca para criar Interface de Usuário (UI)

[ NEXTJS ](https://nextjs.org/) -> um framework do React com capacidade de SSR (Server-side Rendering) e SSG (Static-site Generation)

[ YARN ](https://yarnpkg.com/cli) -> Gerenciador de pacote para a gente poder instalar as coisas na nossa
aplicação

[Material UI | MUI](https://mui.com/material-ui/) -> Uma biblioteca de
componentes prontas pra gente que implementa o Design Google Material

**MUI versão 5 e Vamos usar os Componentes do MUI Core que é gratuito**

## O que vc precisa saber pra começar a contribuir:

Ao clonar a aplicação do git, vc deve ter o yarn instalado no seu computador
não iremos usar o npm porque ele é lento.

Após isso vc entra na pasta clonada e dar o comando:

```bash
yarn install
```

Bom agora vamos pros conceitos:

De REACT é bom entender como funciona um functional component que é o que iremos
usar na maior parte do tempo e além disso saber os principais hooks (useState,
useEffect, useContext ..... quanto mais souber melhor, eu n sei qse nenhum, to
aprendendo )

De Next é bom saber a diferença entre um Client Component e Serve Component e
entender como é a estrutura de pastas e como ela influencia nos links da nossa
aplicação (Por exemplo: dentro da pasta app, se tivermos uma pasta login as
coisas dentro dela serão acessadas no links http://www.nossaaplicacao.com/login)

YARN é saber os comandos de instalação ja basta (yarn install)
porém mais na frente falarei sobre os commits e tem uma ferramente que eu botei
pra ajudar que vai ser utilizada pelo comando (yarn commit)

MUI aqui meu fi é olhar o figma da débora e olhar a documentação pra ver como
usar e como cria cada componente, muitas vezes vai ser só copiar e colar o
código no nosso. Exemplo [ colocando um botão básico ](https://mui.com/material-ui/react-button/) **clica em expand code** para ver as importações

Bom por enquanto é isso e o nosso padrão de commit que está no arquivo
commits.md leia la.
