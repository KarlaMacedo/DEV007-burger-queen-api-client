import { useNavigate } from 'react-router-dom'; // navegar entre 
// CSS
import './users.css';
//COMPONENTES
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton.jsx';
import { UsersLogic } from '../../../utils/users';
import Modal from '../../modal/modal.jsx';
import Input from '../../input/input.jsx'
//ASSETS
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Add from '../../../assets/Images/add.png'

export default function Users() {
  const navigate = useNavigate();
  const {
    usersData,
    getRoleLabel,
    handleOpenModalDeleteUsers,
    handleConfirmDeleteClickUsers,
    handleConfirmEditClickUsers,
    handleOpenEditModalUsers,
    handleCloseModalUsers,
    handleAddClick,
    setNewUser,
    handleInputChange,
    handleConfirmAddClick,
    modalUserId,
    modalOpenDeleteUsers,
    modalOpenEditUsers,
    editingUserData,
    addModalOpen,
    newUser,
  } = UsersLogic();

  return (
    <>
      <div className='containerUsers'>
        <div className='users-container'>
          <div className='headerContainerUsers'>
            <h2 className='titleUsers'>Usuarios</h2>
            <Button label='Productos' classButton='buttonUsers'
            onClick={() => {
              navigate('/products');
            }}/>
            <img
              src={Add}
              className="add"
              alt="buttonAddUsers"
              onClick={handleAddClick}
            />
          </div>
          <div className='users'>
            <table className='users-table'>
              <thead>
                <tr>
                  <th className="tableHeader">ID</th>
                  <th className="tableHeader">CORREO</th>
                  <th className="tableHeader">PUESTO</th>
                  <th className="tableHeader buttTable">EDITAR</th>
                  <th className="tableHeader buttTable">ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.email}</td>
                    <td>{getRoleLabel(user.role)}</td>
                    <td className='buttonsTable'>
                      <img
                        src={Edit}
                        className="edit"
                        alt="buttonEdit"
                        onClick={() => handleOpenEditModalUsers(user.id)}
                      />
                    </td>
                    <td className='buttonsTable'>
                      <img
                        src={Delete}
                        className="delete"
                        alt="buttonDelete"
                        onClick={() => handleOpenModalDeleteUsers(user.id)}
                      />
                    </td>
                    <td className='modalDelete'>
                      <Modal open={modalOpenDeleteUsers && modalUserId === user.id} onClose={handleCloseModalUsers}>
                        <h2 className='textModal'>Estas seguro que deseas eliminar al siguiente usuario?</h2>
                        <div className='containerTextDeleteModal'>
                          <label className="textLabelsModalDeleteUsers">Puesto:</label><label className='userModalText'>{getRoleLabel(user.role)}</label></div>
                        <div className='containerTextDeleteModal'>
                          <label className="textLabelsModalDeleteUsers">Correo:</label><label className='userModalText'>{user.email}</label></div>
                        <div>
                          <Button
                            label='CONFIRMAR'
                            onClick={() => handleConfirmDeleteClickUsers(user.id)}
                            classButton='buttonsModal'>
                          </Button>
                          <Button
                            label='CANCELAR'
                            onClick={handleCloseModalUsers}
                            classButton='buttonsModal'>
                          </Button>
                        </div>
                      </Modal>
                      <Modal open={modalOpenEditUsers && modalUserId === user.id} onClose={handleCloseModalUsers}>
                        <h2 className='textModal'>Editando usuario  #{user.id} :</h2>
                        <div className='infoUserModal'>
                          <Input
                            type='text'
                            placeholder='Escribe aquí'
                            label='CORREO :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit'
                            value={editingUserData?.email || ''}
                            onChange={(event) => handleInputChange('email', event.target.value)}
                          />
                          <Input
                            type='text'
                            placeholder='Escribe aquí'
                            label='CONTRESEÑA :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit'
                            onChange={(event) => handleInputChange('password', event.target.value)}
                          />
                          <div className='selectRolModal'>
                            <label className='bebas'>PUESTO : </label>
                            <select
                              className='boxSelect'
                              value={editingUserData?.role}
                              onChange={(event) => handleInputChange('role', event.target.value)}
                            >
                              <option value='chef'>Cocinero</option>
                              <option value='admin'>Administrador</option>
                              <option value='waiter'>Mesero</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <Button
                            label='CONFIRMAR'
                            classButton='buttonsModal'
                            onClick={handleConfirmEditClickUsers}
                          >
                          </Button>
                          <Button
                            label='CANCELAR'
                            onClick={handleCloseModalUsers}
                            classButton='buttonsModal'
                          >
                          </Button>
                        </div>
                      </Modal>
                      {addModalOpen && (
                        <Modal open={addModalOpen} onClose={handleCloseModalUsers}>
                          <h2 className='textModal'>Agregar Usuario :</h2>
                          <div className='infoUserModal'>
                            <Input
                              type='text'
                              placeholder='Escribe aquí'
                              label='CORREO :'
                              classInputLabel='labelsModalEdit'
                              classInput='inputModalEdit'
                              value={newUser.email}
                              onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
                            />
                            <Input
                              type='text'
                              placeholder='Escribe aquí'
                              label='CONTRASEÑA :'
                              classInputLabel='labelsModalEdit'
                              classInput='inputModalEdit'
                              value={newUser.password}
                              onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
                            />
                            <div className='selectRolModal'>
                              <label className='bebas'>PUESTO :</label>
                              <select
                                className='boxSelect'
                                value={newUser.role}
                                onChange={(event) => setNewUser({ ...newUser, role: event.target.value })}
                              >
                                <option value='' disabled>Seleccione un puesto</option>
                                <option value='chef'>Cocinero</option>
                                <option value='admin'>Administrador</option>
                                <option value='waiter'>Mesero</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <Button
                              label='CONFIRMAR'
                              classButton='buttonsModal'
                              onClick={handleConfirmAddClick}
                            />
                            <Button
                              label='CANCELAR'
                              onClick={handleCloseModalUsers}
                              classButton='buttonsModal'
                            />
                          </div>
                        </Modal>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <LogoutButton />
      </div>
    </>
  );
}