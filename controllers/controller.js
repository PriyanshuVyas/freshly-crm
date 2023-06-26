import axios from 'axios';
import dotenv from 'dotenv';
import mysql from 'mysql';
dotenv.config();

const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${process.env.API_KEY}`,
    },
};

const dbConfig= mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  
  connection.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
  
    console.log('Connected to MySQL!');
  });

export const createContact = async (req, res) => {
    
    const { first_name, last_name, email, mobile_number} = req.body;
  
    try {
      if (data_store === 'CRM') {
        const url = 'https://domain.freshsales.io/api/contacts'; 
      
        const contact = {
          first_name,
          last_name,
          email,
          mobile_number,
        };    
        const response = await axios.post(url, contact, config);
        res.json(response.data);
      }
      else if(data_store==='DATABASE'){
        const connection = await createConnection(dbConfig);
  
    const query = `INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (${first_name}, ${last_name}, ${email}, ${mobile_number})`;
    await connection.execute(query);
  
    await connection.end();
        res.json({ message: 'Contact saved in the database.' });
      }
       else {
        res.status(400).json({ error: 'Invalid data_store parameter.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  };

export const getContact = async(req,res)=>{
    const { contact_id, data_store } = req.query;
  
    try {
      if (data_store === 'CRM') {
        const url = `https://api.freshsales.io/api/contacts/${contact_id}`;
        const response = await axios.get(url, config);      
        res.json(response.data);
        
      } else if (data_store === 'DATABASE') {
        const connection = mysql.createConnection(dbConfig);
  
        const query = `SELECT * FROM contacts WHERE id = ${contact_id}`;
  
        const [rows] = await connection.execute(query); 
        const contact = rows[0] || null;
        connection.end(); 
        
        if (contact) {
          res.json(contact);
        } else {
          res.status(404).json({ error: 'Contact not found in the database.' });
        }
      } else {
        res.status(400).json({ error: 'Invalid data_store parameter.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
}

export const updateContact = async(req,res)=>{

    const { contact_id, new_email, new_mobile_number, data_store } = req.body;
  
    try {
      if (data_store === 'CRM') {
        const url = `https://api.freshsales.io/api/contacts/${contact_id}`; 
        const updatedContact = {contact_id, new_email, new_mobile_number}
        const response = await axios.put(url, updatedContact, config);
        res.json(response.data);

      } else if (data_store === 'DATABASE') {
        const connection =  mysql.createConnection(dbConfig);
  
        const query = `UPDATE contacts SET email = ${new_email}, mobile_number = ${new_mobile_number} WHERE id = ${contact_id}`;
  
        const [result] = await connection.execute(query);
        connection.end();

        if (result.affectedRows > 0) {
            res.json({message: 'Contact updated successfully.'});
        }
        else {
          res.status(404).json({ error: 'Contact not found in the database.' });
        }
      } else {
        res.status(400).json({ error: 'Invalid data_store parameter.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  };
  
export const deleteContact = async(req,res)=>{
    const { contact_id, data_store } = req.body;

  try {
    if (data_store === 'CRM') {
        const url = `https://api.freshsales.io/api/contacts/${contact_id}`;
        const response = await axios.delete(url, config);
        res.json(response.data);
    } else if (data_store === 'DATABASE') {
        const connection =  mysql.createConnection(dbConfig);
        const query = `DELETE FROM contacts WHERE id = ${contact_id}`;
        const [result] = await connection.execute(query);
        connection.end();

        if (result.affectedRows > 0) {
            res.json({ message: 'Contact deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Contact not found in the database.' });
        }
    } else {
        res.status(400).json({ error: 'Invalid data_store parameter.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
  