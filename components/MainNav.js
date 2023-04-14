import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";

import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { removeToken,readToken } from "@/lib/authenticate";

export default function MainNav(){

  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  let token=readToken()

  function logout(){
    setIsExpanded(false)
    removeToken()
    router.push('/login')
  }
function toggle(e){
  setIsExpanded(isExpanded=>isExpanded=!isExpanded)
}
function handlenav(){
  setIsExpanded(false)
} 
function submitForm(e){
    e.preventDefault();

    if(searchField != ""){
      
      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchField("");
      setIsExpanded(false);
      setSearchHistory(current => [...current, `title=true&q=${searchField}`]);
    }
    
  }

  return (
    <>
    <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded} >
      <Container>
        <Navbar.Brand>Shaheid Amin Malik</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
             <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={()=>setIsExpanded(false)} >Home</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={()=>setIsExpanded(false)} >Advanced Search</Nav.Link></Link>
            
            
          </Nav>
          &nbsp;
          <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField} onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>
          &nbsp;
          {token ? (<Nav>

<NavDropdown active={router.pathname === "/history"} title={token.userName} id="basic-nav-dropdown">

 <Link href="/favourites" passHref legacyBehavior >

<NavDropdown.Item href="/favourites" onClick={handlenav}>Favourites</NavDropdown.Item>

</Link>

<Link href="/history" passHref legacyBehavior >

 <NavDropdown.Item href="/history" onClick={handlenav}>Search History</NavDropdown.Item>

</Link>

 <Link href="/" passHref legacyBehavior >

<NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
 </Link>

 </NavDropdown>

 </Nav>)

 :

(<Nav>

<Link href="/register" passHref legacyBehavior >

<Nav.Link href="/register" onClick={handlenav}>Register</Nav.Link>

</Link>

<Link href="/login" passHref legacyBehavior >

<Nav.Link href="/login" onClick={handlenav}>Log in</Nav.Link>

 </Link>

 </Nav>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br /><br /><br />
    </>
  );
}