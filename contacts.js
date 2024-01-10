const fs = require("fs");
const path = require("path");

require("colors");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log("Reading error".red);
    }
    console.log(data.toString());
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    const contacts = JSON.parse(data);
    const contactById = contacts.find(({ id }) => id === contactId);
    if (!contactById) {
      console.log(`Contact with this ${id} was not found`.red);
      return;
    }
    console.log("Contacts by id", [contactById]);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(`Reading error`.red);
      return;
    }
    const contacts = JSON.parse(data);

    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) {
      console.log(
        colors.log(`Contact with ID ${contactId} was not found.`.red)
      );
      return;
    }

    const removedContact = contacts.splice(contactIndex, 1);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log(`Reading error`.red);
        return;
      }

      console.log("Contact removed successfully.".green, removedContact);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(`Reading error`.red);
      return;
    }
    const contacts = JSON.parse(data);

    const newContact = { name, email, phone };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log(`Reading error`.red);
        return;
      }

      console.log(`Contact added successfully.`.green, [newContact]);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
