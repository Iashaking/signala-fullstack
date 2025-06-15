import { Menu } from 'react-feather';
import { Link } from 'wouter';

interface MobileNavbarProps {
  onMenuToggle: () => void;
}

const MobileNavbar = ({ onMenuToggle }: MobileNavbarProps) => {
  return (
    <div className="mobile-navbar">
      <Link href="/search" className="mobile-brand">
        <span>Signal</span>
      </Link>
      <button className="mobile-menu-btn" onClick={onMenuToggle}>
        <Menu size={20} />
      </button>
    </div>
  );
};

export default MobileNavbar;