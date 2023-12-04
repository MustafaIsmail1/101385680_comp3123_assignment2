import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewEmployee = () => {
  const { id } = 
  useParams();
  const navigate = 
  useNavigate();
  const [employee, setEmployee] = 
  useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8585/api/v1/emp/employees/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          console.error('Error fetching employee details');
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/employees');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Employee</h2>
      {employee ? (
        <div>
          <p><strong>First Name:</strong> {employee.first_name}</p>
          <p><strong>Last Name:</strong> {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
        </div>
      ) : (
        <p style={styles.loading}>Loading employee details...</p>
      )}
      <button onClick={handleBack} style={styles.backButton}>Back</button>
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
  addButton: {
    backgroundColor: '#16a085', 
    color: '#ecf0f1',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  viewButton: {
    backgroundColor: '#2980b9', 
    color: '#ecf0f1',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '8px',
  },
  updateButton: {
    backgroundColor: '#f39c12', 
    color: '#ecf0f1',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '8px',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', 
    color: '#ecf0f1',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ViewEmployee;
