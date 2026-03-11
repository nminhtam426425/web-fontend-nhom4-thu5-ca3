import TableUsers from "./table/TableUsers";
import FormAddUser from "./Form/FormAddUser";
import Loading from "./table/Loading"
const apiUserService = ({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081/users"
})

export {TableUsers,FormAddUser,apiUserService,Loading}
