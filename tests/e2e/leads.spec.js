// @ts-check
const { test, expect } = require('@playwright/test');

const {LandingPage} =  require('../pages/LandingPage')

let landingPage 

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
})

test('deve cadastrar um lead na fina de espera', async ({ page }) => {
 
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Robson Augusto', 'pezao@gmail.com')
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.toastHaveText(message)   


});

test('não deve cadastrar um email incorreto', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Robson Augusto', 'pezao.com') 
  await landingPage.alertHaveText('Email incorreto')
  

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'pezao@gmail.com') 
  await landingPage.alertHaveText('Campo obrigatório')
 
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Robson Augusto', '') 
  await landingPage.alertHaveText('Campo obrigatório')
  

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '') 
  await landingPage.alertHaveText(['Campo obrigatório','Campo obrigatório'])
  

});