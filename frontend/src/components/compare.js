import React, { useState, useEffect } from "react";
import axios from "axios";
import Tree from "react-d3-tree";
import { Button, Modal, Form } from "react-bootstrap";

const FamilyTree = () => {
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberParentId, setNewMemberParentId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/family");
      setMembers(response.data.data);
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };

  const handleAddMember = async () => {
    try {
      await axios.post("http://localhost:5000/api/family", {
        name: newMemberName,
        parent_id: newMemberParentId,
      });
      setShowAddModal(false);
      setNewMemberName("");
      setNewMemberParentId(null);
      fetchMembers(); // Refresh the family tree
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/family/${id}`);
      fetchMembers(); // Refresh the family tree
    } catch (error) {
      console.error("Error deleting family member:", error);
    }
  };

  const renderTree = (members) => {
    if (!members.length) return {};

    const buildTree = (parentId) => {
      const children = members.filter(
        (member) => member.parent_id === parentId
      );
      return children.map((child) => ({
        name: child.name,
        attributes: {
          id: child.id,
          birthday: child.birthday,
          dateOfPassing: child.dateOfPassing,
        },
        children: buildTree(child.id),
      }));
    };

    const rootMembers = members.filter((member) => member.parent_id === null);
    return rootMembers.map((root) => ({
      name: root.name,
      attributes: {
        id: root.id,
        birthday: root.birthday,
        dateOfPassing: root.dateOfPassing,
      },
      children: buildTree(root.id),
    }));
  };

  const handleNodeClick = (nodeData) => {
    setSelectedMember(nodeData.data.attributes);
    setShowDetailsModal(true);
  };

  return (
    <div>
      <h2>Family Tree</h2>
      <Button onClick={() => setShowAddModal(true)}>Add Member</Button>
      <div id="treeWrapper" style={{ width: "100%", height: "500px" }}>
        <Tree
          data={renderTree(members)}
          orientation="vertical"
          translate={{ x: 300, y: 100 }}
          onNodeClick={handleNodeClick}
        />
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Family Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Parent ID</Form.Label>
              <Form.Control
                type="text"
                value={newMemberParentId}
                onChange={(e) => setNewMemberParentId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddMember}>
            Add Member
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedMember && (
        <Modal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Member Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ID: {selectedMember.id}</p>
            <p>Name: {selectedMember.name}</p>
            <p>Birthday: {selectedMember.birthday}</p>
            <p>Date of Passing: {selectedMember.dateOfPassing}</p>
            <Button
              variant="danger"
              onClick={() => handleDeleteMember(selectedMember.id)}
            >
              Delete Member
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FamilyTree;
