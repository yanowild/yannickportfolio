# Enterprise Data Integration — Odoo Sales Process Modeling & Integration

## Context
This group project was completed as part of the **Enterprise Data and Integration** course.

The objective was to **analyze, model, and extend a real ERP-supported business process** using **Odoo ERP** as the reference system. The project combined **business process modeling**, **data modeling**, and **system integration** through APIs and a customer-facing web application.

The work was structured in multiple phases (TP1 & TP2), progressing from **process understanding** to **technical integration and prototyping**.

---

## Project Objectives
The project aimed to:

- Understand and model the **end-to-end sales process** supported by Odoo ERP
- Identify and formalize the **core business objects and their lifecycles**
- Demonstrate **programmatic access to ERP data and actions** via Odoo’s XML-RPC API
- Design and prototype a **customer-facing web application** that interacts with Odoo without giving customers direct ERP access

---

## My Role
**Information Systems Analyst / Data & Integration Engineer (Group Project)**

Contributions included:
- Business process modeling (BPMN)
- Conceptual data modeling (business objects & states)
- Analysis of ERP user interfaces and module interactions
- API-based integration with Odoo (XML-RPC)
- Design of an extended sales process including customers
- Contribution to Node-RED web application design and logic

---

## Part 1 — Sales Process Modeling in Odoo (TP1 – Part 1)

### Scope of the Process
We modeled the complete **sales process**, from the initial quotation to post-payment accounting, including:

- Quotation creation
- Sales order confirmation
- Stock availability validation
- Delivery management (multiple channels)
- Goods picking
- Invoicing
- Payment recording and reconciliation

### Roles Involved
- Salesman
- Sales Manager
- Store Manager
- Accountant Clerk

### Deliverables
- **BPMN diagram** describing the full sales process as implemented in Odoo
- **Class diagrams** describing the main business objects
- **State models** describing object lifecycles:
  - Sales Order
  - Delivery
  - Invoice
- Mapping between **ERP UI actions** and process steps:
  - Menus
  - Buttons
  - Cross-module navigation (Sales → Inventory → Accounting)

---

## Part 2 — ERP Integration via XML-RPC API (TP1 – Part 2)

### Objective
Demonstrate how Odoo business objects and processes can be accessed and controlled programmatically using the **XML-RPC API**.

### Implemented Scripts (JavaScript)
We implemented and documented scripts capable of:

- Listing all customers that are companies (not individuals)
- Listing all sales orders for a given customer
- Confirming a quotation (promotion to sales order)
- Creating an invoice for a given order
- Cancelling a quotation

### Technical Highlights
- Use of Odoo developer mode to explore models and fields
- Mapping ERP UI actions to API methods (e.g. `action_confirm`)
- Understanding of ERP state transitions and constraints
- Emphasis on **traceability between business actions and API calls**

---

## Part 3 — Customer-Facing Web Application (TP2)

### Problem Statement
Customers cannot be given direct access to Odoo ERP, but they should still be able to:

- Interact with their orders and quotations
- Participate actively in the sales process
- Communicate with internal sales roles

### Proposed Solution
Design and prototype a **web application** acting as an intermediary between customers and Odoo, implemented using **Node-RED**.

---

## Extended Sales Process (“Our Customers Go Online”)

### Key Idea
Extend the internal sales process by introducing **customer-driven interactions**, while keeping Odoo as the single source of truth.

### Customer Capabilities (Examples)
As a customer, I can:
- View all my orders
- Confirm or cancel a quotation
- Request a change to the delivery date
- Modify quantities or remove order lines (within defined limits)
- Download invoice PDFs
- Report delivery incidents
- Send messages to the Sales Manager

---

## System Architecture
- **Customer Web Application** (Node-RED)
- **Customer API layer**
- **Odoo ERP** (Sales, Inventory, Accounting modules)
- Internal users (Sales Manager, Account Manager) continue working directly in Odoo

The web application interacts with Odoo services while enforcing:
- Role separation
- Process boundaries
- Controlled state transitions

---

## Deliverables (TP2)
- BPMN diagram of the **extended sales process**
- Definition of required **business data classes**
- UI mockups for the customer web application
- Implemented interaction pages in Node-RED
- Tested proof-of-concept prototype

---

## Key Learnings
- ERP systems are **process-centric**, not just databases
- Business objects and their lifecycles are critical for safe integration
- APIs expose power but also require strict governance
- Customer-facing extensions must respect ERP constraints
- Node-RED is effective for rapid integration prototyping
- Enterprise integration is as much about **process design** as technology

---

## Skills & Competencies Demonstrated
- Business Process Modeling (BPMN)
- Enterprise Data Modeling
- ERP process analysis (Odoo)
- API-based system integration (XML-RPC)
- JavaScript scripting for enterprise systems
- Low-code integration (Node-RED)
- IS thinking: alignment between business, data, and systems

---

## Academic Context
- Course: **Enterprise Data and Integration**
- ERP: **Odoo**
- Technologies:
  - XML-RPC API
  - JavaScript
  - Node-RED
- Project type: **Group Project**