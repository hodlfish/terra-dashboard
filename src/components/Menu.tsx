import { NavLink } from 'react-router-dom';
  
function Menu(props: any) {
  return (
    <div id="menu-component">
      {props.links.map((link: any, index: number) => 
        <NavLink key={index} className={state => state.isActive ? 'selected' : ''} to={link.path}>
          <div >{link.name}</div>
        </NavLink>
      )}
    </div>
  );
}
  
export default Menu;
