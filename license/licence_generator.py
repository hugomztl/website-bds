# pip install selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
import os
from dotenv import load_dotenv 

import time

class Connexion:
    def __init__(self, driver, url, username, password):
        self.driver = driver
        self.url = url
        self.username = username
        self.password = password

    def se_connecter(self):
        self.driver.get(self.url)
        wait = WebDriverWait(self.driver, 10)
        login_field = wait.until(EC.presence_of_element_located((By.NAME, "NUMAS")))
        password_field = wait.until(EC.presence_of_element_located((By.NAME, "CODE")))
        login_field.send_keys(self.username)
        password_field.send_keys(self.password)
        submit_button = self.driver.find_element(By.XPATH, "//input[@type='SUBMIT' and @value='Valider']")
        submit_button.click()
        wait.until(EC.url_changes(self.url))
        print("1/4 - Connexion réussie")

class FormulaireLicence:
    def __init__(self, driver, nom, prenom, sexe, date_naissance, pays_naissance, dpt_naissance, ville_naissance, adresse, code_postal, ville, email, sport, assurance, cm_non_risque, cm_risque, date_cm):
        self.driver = driver
        self.nom = nom
        self.prenom = prenom
        self.sexe = sexe
        self.date_naissance = date_naissance
        self.pays_naissance = pays_naissance
        self.dpt_naissance = dpt_naissance
        self.ville_naissance = ville_naissance
        self.adresse = adresse
        self.code_postal = code_postal
        self.ville = ville
        self.email = email
        self.sport = sport
        self.assurance = assurance
        self.cm_non_risque = cm_non_risque
        self.cm_risque = cm_risque
        self.date_cm = date_cm

    def remplir_formulaire(self, form):
        form.find_element(By.XPATH, "//input[@name='NOM']").send_keys(self.nom)
        form.find_element(By.XPATH, "//input[@name='PRENOM']").send_keys(self.prenom)
        form.find_element(By.XPATH, f"//input[@name='SEXE' and @value='{self.sexe}']").click()
        form.find_element(By.XPATH, "//input[@name='DATENAISS']").send_keys(self.date_naissance)
        form.find_element(By.XPATH, "//input[@name='PAYS_NAISSANCE']").send_keys(self.pays_naissance)
        Select(form.find_element(By.XPATH, "//select[@name='DPT_NAISSANCE']")).select_by_value(self.dpt_naissance)
        form.find_element(By.XPATH, "//input[@name='VILLE_NAISSANCE']").send_keys(self.ville_naissance)
        form.find_element(By.XPATH, "//input[@name='ADRESSE1']").send_keys(self.adresse)
        form.find_element(By.XPATH, "//input[@name='CODEPOSTAL']").send_keys(self.code_postal)
        form.find_element(By.XPATH, "//input[@name='VILLE']").send_keys(self.ville)
        form.find_element(By.XPATH, "//input[@name='EMAIL']").send_keys(self.email)
        form.find_element(By.XPATH, "//select[@name='SPORT']").send_keys(self.sport)
        form.find_element(By.XPATH, "//input[@name='LICSPORTIF']").click()

        if self.assurance :
            Select(form.find_element(By.XPATH, "//select[@name='ASSURANCE']")).select_by_value('1')
        else :
            Select(form.find_element(By.XPATH, "//select[@name='ASSURANCE']")).select_by_value('0')

        Select(form.find_element(By.XPATH, "//select[@name='CMNONRISQUE1']")).select_by_value(self.cm_non_risque)
        form.find_element(By.XPATH, "//input[@name='CHECKBOX_FICHE_INDIV_1']").click()
        form.find_element(By.XPATH, "//input[@name='CHECKBOX_FICHE_INDIV_3']").click()
        if form.find_element(By.XPATH, "//input[@name='CHECKBOX_FICHE_INDIV_3']").is_selected():
            Select(form.find_element(By.XPATH, "//select[@name='CMRISQUE1']")).select_by_value(self.cm_risque)
        form.find_element(By.XPATH, "//input[@name='CERTIFICATOK']").click()
        self.driver.execute_script('document.getElementsByName("DATECM")[0].removeAttribute("readonly")')
        form.find_element(By.XPATH, "//input[@name='DATECM']").send_keys(self.date_cm)
        form.find_element(By.XPATH, "//input[@name='PRESIDENTOK']").click()

def main():
    load_dotenv() 

    # Configuration du navigateur
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)  # Assurez-vous d'avoir installé le pilote Chrome approprié

    login = os.getenv("LOGIN")
    password = os.getenv("PASSWORD")

    # Création d'une instance de Connexion et connexion au site
    connexion = Connexion(driver, "http://sport-u-licences.com/", login, password)# trouver un moyen de récupérer et mettre a jour dynamiquement les identifiants FFSU via le panel admin du site
    connexion.se_connecter()

    # Recherche du menu "LICENCES" et survol pour afficher le sous-menu
    menu_licences = driver.find_element(By.ID, "menu1")
    webdriver.ActionChains(driver).move_to_element(menu_licences).perform()

    # Attente que le sous-menu soit visible et clic sur "Gestion des licences"
    wait = WebDriverWait(driver, 10)
    gestion_licences = wait.until(EC.visibility_of_element_located((By.XPATH, "//ul[@id='ssmenu1']/li/a[@href='fnsu_10.php']")))
    gestion_licences.click()

    print("2/4 - Navigation vers 'Gestion des licences' réussie")

    # Attente que la page de gestion des licences soit chargée
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='IMAGE' and @alt='Ajouter']")))

    # Clic sur le bouton "+"
    add_button = driver.find_element(By.XPATH, "//input[@type='IMAGE' and @alt='Ajouter']")
    add_button.click()

    print("3/4 - Clic sur le bouton '+' réussi")

    # Remplissage du formulaire avec des informations arbitraires
    form = driver.find_element(By.NAME, 'formu')

    # Création d'une instance de FormulaireLicence avec des valeurs arbitraires
    formulaire = FormulaireLicence(
        driver,
        nom='Dupont',
        prenom='Jean',
        sexe='M',
        date_naissance='01011990',
        pays_naissance='France',
        dpt_naissance='75',
        ville_naissance='Paris',
        adresse='123 Rue de Paris',
        code_postal='75001',
        ville='Paris',
        email='jean.dupont@example.com',
        sport='Football',
        assurance=True,
        cm_non_risque='59',
        cm_risque='10',
        date_cm='01/01/2024'
        #données de test, à voir comment récupérer les données réelles par une requête ou un webhook
    )

    # Remplissage du formulaire
    formulaire.remplir_formulaire(form)
    print("4/4 - Remplissage du formulaire réussi (mode démo, formulaire non soumis)")
    time.sleep(20)

if __name__ == "__main__":
    main()