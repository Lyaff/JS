document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Validación simple (puedes usar una librería de validación aquí)
    if (!name || !email || !address || !cardNumber || !expiryDate || !cvv) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Aquí se puede integrar con una API de pago real
    alert('¡Pago realizado con éxito!');

    // Redirigir al usuario a la página de inicio o a una página de confirmación
    window.location.href = 'index.html';
});
