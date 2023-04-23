# MVP - Aplicação para Gerenciamento de Matérias

Este é um projeto de uma aplicação web que permite ao usuário gerenciar suas disciplinas, adicionando, editando e removendo informações sobre elas.

## Pré-requisitos

O back-end/endpoints devem estar disponíveis no endereço http://localhost:5000

## Funcionalidades

Com esta aplicação, o usuário pode:

* Adicionar uma nova disciplina, informando seu nome, professor responsável, descrição e se está em andamento ou não.
* Editar as informações de uma disciplina existente.
* Remover uma disciplina.
* Visualizar as disciplinas cadastradas.

## Como usar

1.  Instale as dependências necessárias:

```
npm install
```

2. Exporte a variáveil NODE_OPTIONS. A opção "openssl-legacy-provider" especifica que a implementação do OpenSSL usada para criptografia deve ser a versão legada do OpenSSL.
Essa opção é necessária em alguns casos em que o Node.js está sendo executado em ambientes que possuem versões mais antigas do OpenSSL ou em sistemas operacionais que não possuem suporte para as versões mais recentes do OpenSSL.

```
export NODE_OPTIONS=--openssl-legacy-provider
```

3. Inicie a aplicação:

```
 npm run serve
```

4. Acesse a aplicação em seu navegador no endereço http://localhost:8080
