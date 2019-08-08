import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { addItem } from "../actions/itemActions";
import ItemContext from "../context/item/itemContext";

const ItemModal = ({ isAuthenticated }) => {
  const itemContext = useContext(ItemContext);

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => setModal(!modal);

  const onChange = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name
    };

    // Add item via addItem action
    itemContext.addItem(newItem);

    // Close modal
    toggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
