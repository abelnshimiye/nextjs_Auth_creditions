"use client"
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import { Navbar,Nav, Container, NavDropdown } from "react-bootstrap";
import {usePathname} from "next/navigation";


function NavBar() {

    const pathname = usePathname();

    const {data:session} = useSession();

    console.log(session)

  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
        <Container>
        <Navbar.Brand as={Link} href="/">Auth NextJS</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
            <Nav>
                <Nav.Link as={Link} href="/admin" active={pathname === "/admin"}>Admin</Nav.Link>
                <Nav.Link as={Link} href="/admin/article" active={pathname === "/admin/article"}>Article</Nav.Link>
                
                {/* <Nav.Link as={Link} href="/dynamic" active={pathname === "/dynamic"}>Dynamic</Nav.Link>
                <Nav.Link as={Link} href="/isr" active={pathname === "/isr"}>ISR</Nav.Link> */}

              {/* <NavDropdown title="Topics" id="topics-dropdown">
                <NavDropdown.Item as={Link} href="/topics/health">Health</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/fitness">fitness</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/coding">coding</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} href="/search" active={pathname === "/search"}>search</Nav.Link> */}

            </Nav>

            <Nav>
              

              {session?.user ? 
              (
                <Nav.Link onClick={() => signOut()} >logout</Nav.Link>
              ) 
              : 
              (
                <Nav.Link onClick={() => signIn()} >login</Nav.Link>
              )}

{/* <Nav.Link as={Link} href="/auth/login" active={pathname === "/auth/login"}>login</Nav.Link> */}
            

            </Nav>
        </Navbar.Collapse>

        </Container>
        
    </Navbar>
  )
}

export default NavBar