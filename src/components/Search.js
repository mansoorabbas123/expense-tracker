import React, { useContext } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";

export default function Search() {
     const {handleSearch,search} = useContext(GlobalContext);
     console.log("global state",useContext(GlobalContext))
    return (<>
        <h3>Search</h3>
        <Row>

            <Col xs={4}>
                <Form.Label htmlFor="selectSearch">Select credit/expense</Form.Label>
                <Form.Select aria-label="Default select example" value={search.type} onChange={(e) => handleSearch(e.target.value)} id="selectSearch" style={{ padding: "10px" }}>
                    <option value="expense">expense</option>
                    <option value="credit">credit</option>
                </Form.Select>
            </Col>
            <Col xs={8}>
                <Form.Label htmlFor="searchItems">Search item</Form.Label>
                <Form.Control
                    type="text"
                    id="searchItems"
                    aria-describedby="passwordHelpBlock"
                    style={{ width: "100%" }}
                    value={search.value}
                    onChange={(e)=>handleSearch(search.type,e.target.value)}
                />
            </Col>
        </Row>
    </>
    );
}