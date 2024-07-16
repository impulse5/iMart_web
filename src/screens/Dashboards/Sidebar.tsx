import {LogoWhite} from '../../assets/imart_logo_white'
import { Settings, ShoppingBasket, Package, LayoutDashboard, Users, Tags } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Sidebar() {

  const {pathname} = useLocation();

  function getActiveClass(path: string) {
    return pathname === path;
  }

  return (
    <aside className="grid grid-cols-dashboard w-full h-screen bg-tertiary text-secondary">
      <div className="px-10 py-2">
        <div className='ml-4'>
        <LogoWhite  height={74} width={74}/>
        </div>
        <div className="flex flex-col items-start w-44">
          <div className="mt-14 mb-10 ml-2">
            <h1 className="text-[#A3A3A3] font-bold text-base">Menu Principal</h1>
          </div>
          <div className="flex flex-col w-52 gap-6">
            <Link to='/dashboard' className={`${getActiveClass('/dashboard') ? 'bg-neutral-950 py-2 w-full flex rounded-lg transition-all' : ' py-2 w-full flex rounded-lg'} `}>
              <LayoutDashboard className="mx-2" />
              Dashboard
            </Link>
            <Link to='/funcionarios' className={`${getActiveClass('/funcionarios') ? 'bg-neutral-950 py-2 w-full flex rounded-lg transition-all' : ' py-2 w-full flex rounded-lg'} `}>
              <Users className="mx-2" />
              Funcionários
            </Link>
            <Link to='/fornecedores' className={`${getActiveClass('/fornecedores') ? 'bg-neutral-950 py-2 w-full flex rounded-lg transition-all' : ' py-2 w-full flex rounded-lg'} `}> 
              <Package className="mx-2" />
              Fornecedores
            </Link>
            <Link to='/categorias' className={`${getActiveClass('/categorias') ? 'bg-neutral-950 py-2 w-full flex rounded-lg transition-all' : ' py-2 w-full flex rounded-lg'} `}>
              <Tags className="mx-2" />
              Categorias
            </Link>
            <Link to='/produtos' className={`${getActiveClass('/produtos') ? 'bg-neutral-950 py-2 w-full flex rounded-lg transition-all' : ' py-2 w-full flex rounded-lg'} `}>
              <ShoppingBasket className="mx-2 " />
              Produtos
            </Link>
            <button className="py-2 w-full flex">
              <Settings className="mx-2" />
              Configurações
            </button>
          </div>
        </div>
      </div>
      <div>
      <Outlet/>
      </div>
  </aside>
  );
}