import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = 
  useState([]);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await fetch('http://localhost:8585/api/v1/emp/employees');
        if (response.ok) {
          const data = await response.json();
          setEmployeeList(data);
        } else {
          console.error('Error fetching employee list');
        }
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };

    fetchEmployeeList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8585/api/v1/emp/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedList = employeeList.filter((employee) => employee._id !== id);
        setEmployeeList(updatedList);
      } else {
        console.error('Error deleting employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee List</h2>
      <Link to="/add-employee">
        <button style={styles.addButton}>Add Employee</button>
      </Link>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <Link to={`/view-employee/${employee._id}`}>
                  <button style={styles.viewButton}>View</button>
                </Link>
                <Link to={`/update-employee/${employee._id}`}>
                  <button style={styles.updateButton}>Update</button>
                </Link>
                <button onClick={() => handleDelete(employee._id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default EmployeeList;
