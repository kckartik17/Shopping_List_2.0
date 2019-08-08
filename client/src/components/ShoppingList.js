import React, { useEffect, useContext } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ItemContext from "../context/item/itemContext";

const ShoppingList = ({ getItems, item, isAuthenticated }) => {
  const itemContext = useContext(ItemContext);

  useEffect(() => {
    getItems();
  }, []);

  const { getItems, deleteItem } = itemContext;

  const onDeleteClick = id => deleteItem(id);

  const { items } = item;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {this.props.isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={onDeleteClick(_id)}
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
