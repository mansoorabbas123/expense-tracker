import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.content.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.content.title === "Update your budget" && (
          <>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const budgetValue = e.target.budget.value;
                if (budgetValue) {
                  props.content.updateBudgetHanler(parseInt(budgetValue));
                  props.onHide();
                }
              }}
            >
              <Form.Label htmlFor="budget">Enter your budget</Form.Label>
              <Form.Control
                type="number"
                id="budget"
                aria-describedby="passwordHelpBlock"
                name="budget"
                min={0}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </>
        )}
        {props.content.title === "Reminder" && (
          <p>
            Your Total Remaining balance is 0 or less than your current expense.
            Kindly add some credit first
          </p>
        )}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

const ModalComp = ({ modalShow, open, content }) => {
  return (
    <>
      <MyVerticallyCenteredModal
        show={open}
        onHide={() => modalShow()}
        content={content}
      />
    </>
  );
};

export default ModalComp;
