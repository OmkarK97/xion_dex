import React from "react";
import { Link } from "react-router-dom";
import xionLogo from "../assets/xion.svg";
import { Button } from "@burnt-labs/ui";
import { Wallet } from "lucide-react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";

function Navigation() {
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const [, setShow] = useModal();
  return (
    <nav className="border-b border-gray-800/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/32089.png"
              alt="XION"
              className="h-8 w-8"
            />
            <span className="text-white text-xl font-semibold">XION</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/swap" className="text-[#00E4FF]">
              Swap
            </Link>
            <Link to="/pools" className="text-gray-400 hover:text-white">
              Pools
            </Link>
            <Link to="/farm" className="text-gray-400 hover:text-white">
              Farm
            </Link>
            <Link to="/stake" className="text-gray-400 hover:text-white">
              Stake
            </Link>
            <Link to="/bridge" className="text-gray-400 hover:text-white">
              Bridge
            </Link>
          </div>
        </div>

        <Button
          onClick={() => {
            setShow(true);
          }}
          structure="base"
          className="px-4 py-2 rounded-lg bg-gradient-to-r flex justify-center items-center gap-3 from-[#00E4FF] to-[#0066FF] text-white font-medium hover:opacity-90"
        >
          <Wallet className="w-4 h-4" />
          {bech32Address ? "VIEW ACCOUNT" : "CONNECT"}
        </Button>
        <Abstraxion onClose={() => setShow(false)} />
      </div>
    </nav>
  );
}

export default Navigation;
