import TableUsers from "./table/TableUsers";
import FormAddUser from "./Form/FormAddUser";

const apiUserService = ({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/users',
});

export {TableUsers,FormAddUser,apiUserService}