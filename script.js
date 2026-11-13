
    let contacts = JSON.parse(localStorage.getItem('contacts')) || []
    let editIndex = -1

    const form = document.getElementById('contactForm')
    const list = document.getElementById('contactsList')
    const submitBtn = document.getElementById('submitBtn')

    function saveAndRender() {
      localStorage.setItem('contacts', JSON.stringify(contacts))
      renderContacts()
    }

    function renderContacts() {
      list.innerHTML = ''

      contacts.forEach((contact, index) => {
        const div = document.createElement('div')
        div.className = 'card'
        div.innerHTML = `
          <strong>${contact.firstName} ${contact.lastName}</strong><br>
          Телефон: ${contact.phone}<br>
          Email: ${contact.email}<br><br>
          <button onclick="editContact(${index})">Редактировать</button>
          <button onclick="deleteContact(${index})">Удалить</button>
        `;
        list.appendChild(div)
      })
    }


    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const contactData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim()
      }

      if (editIndex === -1) {
        contacts.push(contactData)
      } else {

        contacts[editIndex] = contactData
        editIndex = -1
        submitBtn.textContent = 'Сохранить'
      }

      form.reset()
      saveAndRender()
    });

    function deleteContact(index) {
      contacts.splice(index, 1)
      saveAndRender()
    }

    function editContact(index) {
      const contact = contacts[index];
      document.getElementById('firstName').value = contact.firstName
      document.getElementById('lastName').value = contact.lastName
      document.getElementById('phone').value = contact.phone
      document.getElementById('email').value = contact.email

      editIndex = index;
      submitBtn.textContent = 'Обновить'
    }

    // Первая отрисовка при загрузке страницы
    renderContacts();