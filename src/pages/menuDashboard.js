import { Button, Container, Form, Modal } from "react-bootstrap";
import Navbar from "../components/navbar.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRestId } from "../utils/utils.js";
import axios from "axios";
import DataTable from "react-data-table-component";


const Menu = () => {

    const [menuData, setMenuData] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [menuItem, setMenuItem] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    })

    useEffect(() => {
        setRestaurantId(getRestId());
    }, []);
    
    useEffect(() => {
        getMenu();
    }, [restaurantId]);
    

    const getMenu = async () => {
        try {
            const response = await axios.get("http://restohub-api.us-east-2.elasticbeanstalk.com/api/manager/menuItems", {
                params: {
                    restaurantId: restaurantId
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setMenuData(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    const columns = [
        {name: 'Name', selector: (row, i) => row.name, center: true, sortable: true},
        {name: 'Description', selector: (row, i) => row.description, center: true, sortable: true},
        {name: 'Price', selector: (row, i) => row.price, center: true, sortable: true},
        {name: 'Category', selector: (row, i) => row.category, center: true, sortable: true},
        {
            name: '',
            cell: (row, index, column, id) => (
                <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => handleEditButton(row)} variant="success">Edit</Button>
                </Container>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: '',
            cell: (row, index, column, id) => (
                <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => handleDelete(row)} variant="danger">Delete</Button>
                </Container>
            ),
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleMenuItemChange = (e) => {
        const { name, value } = e.target;
        setMenuItem((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const resetModalState = () => {
        setMenuItem({});
        setShowCreateModal(false)
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        
        const newMenuItem = {
            menuItem: menuItem,
            restaurantId: restaurantId
        }

        try {
            const response = await axios.post("http://restohub-api.us-east-2.elasticbeanstalk.com/api/manager/saveMenuItem", newMenuItem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const itemName = response.data.name


            if (response.status === 200) {
                toast.success(`New menu item ${itemName} was successfully created`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                resetModalState();
                getMenu();

            } else {
                toast.error("Failed to create new item, please try again", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (e) {
            toast.error("Error occurred while submitting request", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const handleEditButton = async () => {

    };

    const handleDelete = async (e) => {

        const itemId = e.id;
        const itemName = e.name
        if (!itemId) {
            toast.error("Please select a user.", {
                position: toast.POSITION.TOP_RIGHT
            })
            return;
        }
        const shouldDelete = window.confirm(`Are you sure you want to delete the following item: ${itemName}?`);

        if (shouldDelete) {

            try {
                const response = await axios.delete('http://restohub-api.us-east-2.elasticbeanstalk.com/api/manager/deleteMenuItem', {
                    params: {
                        menuItemId: itemId
                    }
                })

                if (response.status === 200) {
                    toast.success(`Item ${itemName} has been succesfully removed`, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    getMenu();
                } else {
                    toast.error(`Unkown server error occurred, please try again.`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                };

            } catch (error) {
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        };
    };

    return(
        <div>
            <Navbar />
            <ToastContainer />
            <Container>
                <h1>Menu dashboard</h1>
                <Button variant="success" onClick={() => setShowCreateModal(true)}>Create new menu item</Button>
                <br></br>
                <Modal show={showCreateModal} onHide={() => {setShowCreateModal(false)}}>
                    <Container>
                        <Form className="formclass centered" onSubmit={handleCreate}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create a new menu item</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <div className="form-group"> 
                                        <br></br>
                                        <Form.Label>Item name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Item name"
                                            name="name"
                                            value={menuItem.name}
                                            onChange={handleMenuItemChange}
                                            required
                                        />
                                        <br></br>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Description"
                                            name="description"
                                            value={menuItem.description}
                                            onChange={handleMenuItemChange}
                                            required
                                        />
                                        <br></br>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder="Price"
                                            name="price"
                                            value={menuItem.price}
                                            onChange={handleMenuItemChange}
                                            required
                                        />
                                        <br></br>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Category"
                                            name="category"
                                            value={menuItem.category}
                                            onChange={handleMenuItemChange}
                                            required
                                        />
                                    </div>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Form.Group className="w-100 d-flex justify-content-between">
                                    <Button variant="danger" onClick={() => setShowCreateModal(false)}>Close</Button>
                                    <Button variant="success" type="submit">Confirm</Button>
                                </Form.Group>
                            </Modal.Footer>
                        </Form>
                    </Container>
                </Modal>
                <Container>
                    <DataTable 
                    data={menuData}
                    columns={columns}
                    fixedHeader
                    striped
                    />
                </Container>
            </Container>
        </div>
    );
}  

export default Menu;