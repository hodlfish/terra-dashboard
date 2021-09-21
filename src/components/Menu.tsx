import { NavLink } from 'react-router-dom';
  
function Menu(props: any) {
  return (
    <div id="menu-component">
      {props.links.map((link: any, index: number) => 
        <NavLink key={index} activeClassName="selected" to={link.path}>
          <div>{link.name}</div>
        </NavLink>
      )}
    </div>
  );
}
  
export default Menu;