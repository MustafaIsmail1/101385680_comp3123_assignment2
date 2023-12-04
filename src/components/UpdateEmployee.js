import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = 
  useParams();
  const navigate = 
  useNavigate();

  const [firstName, setFirstName] = 
  useState('');
  const [lastName, setLastName] = 
  useState('');
  const [email, setEmail] = 
  useState('');

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8585/api/v1/emp/employees/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
        } else {
          console.error('Error fetching employee details for update');
        }
      } catch (error) {
        console.error('Error fetching employee details for update:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8585/api/v1/emp/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email }),
      });

      if (response.ok) {
        navigate('/employees');
      } else {
        console.error('Error updating employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Employee</h2>
      <div>
        <label htmlFor="firstName" style={styles.label}>First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} />
      </div>
      <div>
        <label htmlFor="lastName" style={styles.label}>Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} />
      </div>
      <div>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
      </div>
      <button onClick={handleSave} style={styles.saveButton}>Save</button>
      <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
    </div>
  );
};

const styles = {
  container: {
    width: '60%',
    margin: 'auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#2c3e50', 
    color: '#ecf0f1',
  },
  heading: {
    textAlign: 'center',
    color: '#ecf0f1', 
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#ecf0f1', 
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    fontSize: '16px',
  },
  saveButton: {
    backgroundColor: '#27ae60', 
    color: '#ecf0f1',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px', 
  },
  cancelButton: {
    backgroundColor: '#e74c3c', 
    color: '#ecf0f1',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};


export default UpdateEmployee;
