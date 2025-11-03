import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";

export default function ManageUser() {
  return (
    <div>
      <div>
        <ModalCreateUser />
      </div>
      <div>
        <TableUser />
      </div>
    </div>
  );
}
