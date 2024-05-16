# Automation Swag Labs 

[![automation-swag-labs](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/detailed/9edqig/main&style=for-the-badge&logo=cypress)](https://cloud.cypress.io/projects/9edqig/runs)

  ## Este projeto tem como objetivo demonstrar uma porcentagem das minhas habilidades em automação de software com Cypress. Foi utilzado o site [Swag Labs](https://www.saucedemo.com/) para tal demonstração.



Sumário
=================

   * [Instalação](#instalacao)
   * [Como executar](#como-executar)
      * [Browser](#browser)
      * [Headless Browser](#headless-browser)


## [Instalação](#instalacao)

1. Clone o repositório para a sua pasta de trabalho de preferência
  ``` bash
  git clone https://github.com/feroline/automation-swag-labs.git
  ```

2. Execute o comando abaixo para baixar as dependências do projeto
    ``` 
    npm install
    ```
## [Como Executar](#como-executar)
  Agora que tem as dependências do projeto, você poderá executar os testes automatizados de duas formas, no browser ou headless browser, para saber mais sobre as duas formas clique [aqui](https://sembugs.blogspot.com/2013/09/o-que-e-headless-browser.html)
  
  ### [Browser](#browser) 
  Para executar os testes no browser, ou seja, no navegador visível, basta executar o comando abaixo: 
  ```
  npx cypress open
  ```

  Selecione a opção de testes E2E, no qual se trata do tipo de testes que este projeto realiza, para saber mais sobre testes E2E clique [aqui](https://www.dio.me/articles/introducao-aos-testes-end-to-end-e2e-com-cypress)

   ![selectE2E-1](https://github.com/feroline/automation-swag-labs/assets/47784645/02e03257-0766-453c-a71f-0317bb0ea35d)

   Agora basta selecionar o navegador desejado para executar os testes, neste caso seleciono o Chrome, para que o parâmetro ``` webSecurity:false ``` passado nas configurações do projeto funcione, para saber mais sobre webSecurity clique [aqui](https://docs.cypress.io/guides/guides/web-security)

   ![selectChrome-2](https://github.com/feroline/automation-swag-labs/assets/47784645/b733b1eb-4b0a-4669-8128-7bf24563306b)
   
  Selecione o spec que deseja executar, neste caso seleciono o spec no qual tem os cenários de teste da tela de login

  ![selectSpec-3](https://github.com/feroline/automation-swag-labs/assets/47784645/bb4c1118-ede5-40e8-9ea9-aeb1cea9c284)

  Agora veja os cenários de teste que passaram e os que deram erro, além de seus motivos.

  ![runSpec-4](https://github.com/feroline/automation-swag-labs/assets/47784645/699e7c28-e466-481a-955f-c9a8c5537559)

       
  
  ### [Headless Browser](#headless-browser)
   Para executar os testes de forma Headless Browser, ou seja, sem o navegador visível, execute o comando abaixo: 
  ```
  npx cypress run
  ```
   

  No final os resultados do seu teste irão ser apresentados desta forma

  ![relatorioFinal](https://github.com/feroline/automation-swag-labs/assets/47784645/9a6ee7e7-d85d-4cf4-83f9-0e636500dd4c)


## Prontinho, agora é só aproveitar os testes com Cypress ;) !!




  