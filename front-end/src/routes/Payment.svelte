<script lang="ts">
    let totalAmount = ''; // Montant total en centimes
    let initialAmount = totalAmount; // Montant à payer immédiatement / si on veut le payer en plusieurs fois
    let itemName = 'Licence FFSU';
    let backUrl = 'https://www.partnertest.com/cancel.php'; // URL à modifier
    let errorUrl = 'https://www.partnertest.com/error.php'; // URL à modifier
    let returnUrl = 'https://bds-cesi-nancy.fr';
    let containsDonation = false; 
    let firstName = 'Haik';
    let lastName = 'Boulanger';
    let email = 'haik.boulanger@gmail.com';
    let dateOfBirth = '1990-01-01';
    let address = '123 Rue de la Paix';
    let city = 'Paris';
    let zipCode = '75000';
    let country = 'FRA';

    $: totalAmount = initialAmount; // A Changer si on veut le payer en plusieurs fois

    function validateName(name: string) {
        const forbiddenValues = [
            "firstname", "lastname", "unknown", "first_name", "last_name", 
            "anonyme", "user", "admin", "name", "nom", "prénom", "test"
        ];
        const regex = /^(?!.*([a-zA-Z])\1{2})(?!.*\d)(?!^[^aeiou]*$)(?!.*[^a-zA-Zéèêëàâùûç’\-])/; // Regex pour les règles
        return regex.test(name) && !forbiddenValues.includes(name.toLowerCase());
    }

    function validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour un email valide
        return regex.test(email);
    }

    function validateDateOfBirth(dateOfBirth: string) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        return age > 18 || (age === 18 && monthDiff >= 0); // Vérifie si l'acheteur est majeur
    }

    async function handlePayment() {
        // Validation des champs
        if (!validateName(firstName)) {
            alert("Le prénom est invalide.");
            return;
        }
        if (!validateName(lastName)) {
            alert("Le nom est invalide.");
            return;
        }
        if (!validateEmail(email)) {
            alert("L'email est invalide.");
            return;
        }
        if (!validateDateOfBirth(dateOfBirth)) {
            alert("L'acheteur doit être majeur.");
            return;
        }

        const paiementData = {
            totalAmount,
            initialAmount,
            itemName,
            backUrl,
            errorUrl,
            returnUrl,
            containsDonation,
            payer: {
                firstName,
                lastName,
                email,
                dateOfBirth,
                address,
                city,
                zipCode,
                country,
            },
        };

        try {
            const response = await fetch('http://localhost:5000/api/payments', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paiementData),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                window.location.href = data.data.redirectUrl;
            } else {
                alert('Erreur lors du paiement : ' + data.error);
            }
        } catch (error) {
            console.error('Erreur de réseau :', error);
            alert('Erreur de réseau, veuillez réessayer.');
        }
    }
</script>

<main>
    <h1>Formulaire de Paiement</h1>
    <form on:submit|preventDefault={handlePayment}>
        <label>
            Montant Total (en centimes):
            <input type="number" bind:value={initialAmount} required />
        </label>
        <label>
            Description de l’Achat:
            <input type="text" bind:value={itemName} maxLength="250" required />
        </label>
        <label>
            Prénom:
            <input type="text" bind:value={firstName} required />
        </label>
        <label>
            Nom:
            <input type="text" bind:value={lastName} required />
        </label>
        <label>
            Email:
            <input type="email" bind:value={email} required />
        </label>
        <label>
            Date de Naissance:
            <input type="date" bind:value={dateOfBirth} required />
        </label>
        <label>
            Adresse:
            <input type="text" bind:value={address} required />
        </label>
        <label>
            Ville:
            <input type="text" bind:value={city} required />
        </label>
        <label>
            Code Postal:
            <input type="text" bind:value={zipCode} required />
        </label>
        <button type="submit">Payer</button>
    </form>
</main>

<style>
    main {
        max-width: 600px;
        margin: auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    label {
        display: block;
        margin-bottom: 0.5rem;
    }
    input, select {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #218838;
    }
</style>