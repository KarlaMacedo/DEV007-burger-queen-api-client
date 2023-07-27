/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CSS
import './orders.css'
//COMPONENTES
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton';
import ApiRequest from '../../../services/apiRequest';
//ASSETS
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Check from '../../../assets/Images/listo.png'

export default function Orders() {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {

    if (!token) {
      // Redirigir al usuario al inicio de sesión si no hay un accessToken
      navigate('/login');
      return;
    }

        ApiRequest({
          url: 'http://localhost:8080/orders',
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => {

        const filteredOrders = response.data.filter((order) => order.userId === Number(userId));

      setOrdersData(filteredOrders);
    })
    .catch((error) => {
      console.error(error);
    });
}, [navigate, token, userId]);

  const getProductsList = (products) => {
    return products.map((item) => `${item.qty} ${item.product.name}`).join(', ');
  };

  const getTotalOrder = (prices) => {
    return prices.reduce((total, item) => total + item.qty * item.product.price, 0);
  };

  const handleMenuClick = () => {
    console.log('hola');
    navigate('/menu');
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Entregado' : 'green',
      'Listo en barra' : 'yellow',
      'En preparación' : '',
    }
    return statusColors[status];
  }

  const handleCheckClick = (orderId) => {
    const body = {
      "status": "Entregado"
    };

    ApiRequest({
      url: `http://localhost:8080/orders/${orderId}`,
      method: 'patch',
      body: body,
    })
    .then((response) => {
      console.log('Response from server status:', response.data);
      console.log(orderId);

      setOrdersData(prevOrders => {
        const updatedOrders = prevOrders.map(order => {
          if (order.id === orderId) {
            return { ...order, status: "Entregado" };
          }
          return order;
        });
        return updatedOrders;
      });
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleDeleteClick = (orderId) => {
    const orderDelete = ordersData.find(order => order.id === orderId);
    console.log('123',orderDelete);
    
    const body = orderDelete;

    ApiRequest({
          url: `http://localhost:8080/orders/${orderId}`,
          method: 'delete',
          body: body,
        })
        .then((response) => {
          console.log('Response from server delete:', response.data);
          console.log(orderId);
        })
        .catch((error) => {
          console.error(error);
        });

    if (!orderDelete) {
      console.error('Orden no encontrada en el estado local, actualiza la página para actualizar la data.');
    }
  }

  return (
    <>
      <div className='containerOrders'>
      <Button label='MENU' onClick={handleMenuClick} classButton='buttonMenu'/>
          <div className='orders'>
            <table className='orders-table'>
              <thead>
                <tr>
                <th className="tableHeader">MESA</th>
                  <th className="tableHeader">CLIENTE</th>
                  <th className="tableHeader">PEDIDO</th>
                  <th className="tableHeader">ESTADO</th>
                  <th className="tableHeader">TOTAL</th>
                  <th className="tableHeader">EDITAR</th>
                  <th className="tableHeader">ELIMINAR</th>
                  <th className="tableHeader">ENTREGADO</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.table}</td>
                    <td>{order.client}</td>
                    <td>{getProductsList(order.products)}</td>
                    <td className={getStatusColor(order.status)}>{order.status}</td>
                    <td>${getTotalOrder(order.products)}</td>
                    <td className='buttonsTable'><img src={Edit} className="edit" alt="buttonEdit" /></td>
                    <td className='buttonsTable'><img src={Delete} className="delete" alt="buttonDelete" onClick={() => handleDeleteClick(order.id)}/></td>
                    <td className='buttonsTable'><img src={Check} className="check" alt="buttonCheck" onClick={() => handleCheckClick(order.id)}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <LogoutButton />
      </div>
    </>
  );
}