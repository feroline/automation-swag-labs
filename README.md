1. Clone o repositório para a sua pasta de trabalho de preferência
``` bash
    git clone https://github.com/feroline/automation-swag-labs.git
```

2. Execute o comando abaixo para baixar as dependências do projeto
    ``` 
    npm install
    ```

3. Agora com as dependências basta executar um dos comandos abaixo para executar o projeto.
    3.1. Para executar os testes com cabeçalho, ou seja, com o navegador visível execute o comando abaixo: 
    ```
     npx cypress open
    ```

     3.1.1. Selecione a opção de testes E2E, no qual se trata o tipo de teste deste projeto
       ![selectE2E-1](https://github.com/feroline/automation-swag-labs/assets/47784645/02e03257-0766-453c-a71f-0317bb0ea35d)
   
    3.1.2. Selecione o navegador desejado para executar os testes, neste caso estou selecionando o Chrome, pois no site testado tive que tornar o webSecurity:false, sendo assim será o navegador onde os testes 
       ![selectChrome-2](https://github.com/feroline/automation-swag-labs/assets/47784645/b733b1eb-4b0a-4669-8128-7bf24563306b)
    3.1.3. Selecione o spec que deseja executar, neste caso selecionei o de Login
       ![selectSpec-3](https://github.com/feroline/automation-swag-labs/assets/47784645/bb4c1118-ede5-40e8-9ea9-aeb1cea9c284)
     3.1.4. Veja os cenários que passaram, deram erro e os detalhes e aproveite o cypress
        ![runSpec-4](https://github.com/feroline/automation-swag-labs/assets/47784645/699e7c28-e466-481a-955f-c9a8c5537559)

   
  3.2. Para executar os testes sem cabeçalho, ou seja, sem o navegador visível execute o comando abaixo: 
  ```
    npx cypress run
  ```

No final os resultados do seu teste irão se parecer com algo assim: 

  ![relatorioFinal](https://github.com/feroline/automation-swag-labs/assets/47784645/9a6ee7e7-d85d-4cf4-83f9-0e636500dd4c)





