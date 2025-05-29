function validateAndLogFormData() {
  const form = document.getElementById("contact-form");
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const subjectInput = form.querySelectorAll('input[type="text"]')[1];
  const messageInput = form.querySelector("textarea");

  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: messageInput.value.trim(),
  };

  const errors = [];

  if (!formData.name) {
    errors.push("El nombre es requerido");
  } else if (formData.name.length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.push("El email es requerido");
  } else if (!emailRegex.test(formData.email)) {
    errors.push("El email no tiene un formato válido");
  }

  if (!formData.subject) {
    errors.push("El asunto es requerido");
  } else if (formData.subject.length < 3) {
    errors.push("El asunto debe tener al menos 3 caracteres");
  }

  if (!formData.message) {
    errors.push("El mensaje es requerido");
  } else if (formData.message.length < 10) {
    errors.push("El mensaje debe tener al menos 10 caracteres");
  }

  console.log("=".repeat(50));
  console.log("📋 DATOS DEL FORMULARIO");
  console.log("=".repeat(50));

  if (errors.length > 0) {
    console.log("ERRORES DE VALIDACIÓN:");
    errors.forEach((error, index) => {
      console.log(error);
    });

    return { success: false, errors };
  }

  console.log("👤 Nombre:", formData.name);
  console.log("📧 Email:", formData.email);
  console.log("📝 Asunto:", formData.subject);
  console.log("💬 Mensaje:", formData.message);
  return { success: true, data: formData };
}

function displayMessage(message, isError = false) {
  const messageDiv = document.getElementById("form-message");
  messageDiv.innerHTML = message;
  messageDiv.className = isError
    ? "form-message error"
    : "form-message success";
  messageDiv.style.display = "block";
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const result = validateAndLogFormData();

    if (result.success) {
      displayMessage("¡Gracias por tu mensaje! Te contactaré pronto.", false);
      this.reset();
    } else {
      const errorList = result.errors
        .map((error) => `<li>${error}</li>`)
        .join("");
      displayMessage(`<ul>${errorList}</ul>`, true);
    }
  });
